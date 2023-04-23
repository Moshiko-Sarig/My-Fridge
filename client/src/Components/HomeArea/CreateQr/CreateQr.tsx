import './CreateQr.css'
import { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import api_endpoints from '../../../Utils/api.endpoints';
import ItemCategoryModel from '../../../Models/ItemCategoryModel';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../LayoutArea/Layout/Layout';
import axios from 'axios';


export default function CreateQr(): JSX.Element {
    const logged = useSelector((state: ReduxState) => state.logged);
    const initialFormData = {
        category_name: "",
        item_name: "",
        quantity: "",
        expiration_date: "",
        qr_image: "",
        user_id: logged.userInfo.user_id
    }
    const [formData, setFormData] = useState(initialFormData);
    const { data: categories, loading, error, reFetch } = useFetch(`${api_endpoints.GET_CATEGORIES}`, null, null);
    const allCategories = categories as ItemCategoryModel[];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    async function createItem() {
        event.preventDefault();
        try {
            console.log(formData);
            const newItem = await axios.post('http://localhost:4000/api/v1/items/add/new/item', formData);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            updateItemId();
        }
    }
    useEffect(() => {
        async function updateItem() {
            try {
                const latestItem = await axios.get(`${api_endpoints.GET_LATEST_ITEM}`);
                const QRLINK = `${api_endpoints.GET_ITEM}/${latestItem.data[0].item_id + 1}`;
                console.log(QRLINK);
                setFormData({
                    ...formData,
                    qr_image: `${QRLINK}`,
                });
            } catch (error) {
                console.log(error);
            }
        }
        updateItem();
    }, []);

    async function updateItemId() {
        try {
            const latestItem = await axios.get(`${api_endpoints.GET_LATEST_ITEM}`);
            const QRLINK = `${api_endpoints.GET_ITEM}/${latestItem.data[0].item_id + 1}`;
            console.log(QRLINK);
            setFormData({
                ...formData,
                qr_image: `${QRLINK}`,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='CreateQr'>
            <h3 className='qrTitle'>Please fill out the required info</h3>
            <form onSubmit={createItem}>
                <div className='gridRow'>
                    <select name="category_name" value={formData.category_name} onChange={handleInputChange}>
                        {Array.isArray(allCategories) && allCategories.map((category: ItemCategoryModel) => (
                            <option key={category.category_id} value={category.category_name}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='gridRow'>
                    <div className="form__group field">
                        <input type="text" className="form__field" placeholder="Item name" name="item_name" id="item_name"
                            value={formData.item_name} onChange={handleInputChange} required />
                        <label htmlFor="item_name" className="form__label">Item name</label>
                    </div>
                </div>
                <div className='gridRow'>
                    <div className="form__group field">
                        <input type="number" className="form__field" placeholder="Quantity" name="quantity" id="quantity"
                            value={formData.quantity} onChange={handleInputChange} required />
                        <label htmlFor="Quantity" className="form__label">Quantity</label>
                    </div>
                </div>
                <div className='gridRow'>
                    <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleInputChange} />
                </div>
                <div className='gridRow'>
                    <input type="submit" value="Add item" />
                </div>
            </form >
        </div >
    )
}