import './CreateQr.css'
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import api_endpoints from '../../../Utils/api.endpoints';
import ItemCategoryModel from '../../../Models/ItemCategoryModel';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../LayoutArea/Layout/Layout';
import axios from 'axios';


export default function CreateQr(): JSX.Element {
    const initialFormData = {
        category_name: "",
        item_name: "",
        quantity: "",
        expiration_date: "",
        qr_image: "",
        user_id: ""
    }
    const [formData, setFormData] = useState(initialFormData);
    const { data: categories, loading, error, reFetch } = useFetch(`${api_endpoints.GET_CATEGORIES}`, null, null);
    const allCategories = categories as ItemCategoryModel[];
    const logged = useSelector((state: ReduxState) => state.logged);



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    async function createItem() {
        setFormData({
            ...formData,
            user_id: logged.userInfo.user_id,
        });
        try {
            event.preventDefault();
            const newItem = await axios.post('http://localhost:4000/api/v1/items/add/new/item', formData);
            const latestItem = await axios.get(api_endpoints.GET_LATEST_ITEM);
            const QRLINK = `${api_endpoints.GET_ITEM}/${latestItem.data[0].item_id + 1}`;
            setFormData({
                ...formData,
                qr_image: `${QRLINK}`,
                user_id: logged.userInfo.user_id,
            });
            console.log(formData);
            console.log(QRLINK);
            const completeItem = await axios.put(api_endpoints.EDIT_ITEM, formData);
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className='CreateQr'>
            <h1>Please fill out the required info</h1>
            <form onSubmit={createItem}>
                <div>
                    <select name="category_name" value={formData.category_name} onChange={handleInputChange}>
                        {Array.isArray(allCategories) && allCategories.map((category: ItemCategoryModel) => (
                            <option key={category.category_id} value={category.category_name}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type="text" name="item_name" value={formData.item_name} onChange={handleInputChange}
                        placeholder="Item name" />
                </div>
                <div>
                    <input type="number" name="quantity" value={formData.quantity} min={1} onChange={handleInputChange}
                        placeholder="Quantity" />
                </div>
                <div>
                    <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleInputChange} />
                </div>
                <div>
                    <input type="submit" value="Add item" />
                </div>
            </form>
        </div>
    )
}