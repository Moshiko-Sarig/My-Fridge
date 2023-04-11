import QRCode from "react-qr-code";
import ItemModel from "../../Models/ItemModel";
import { useState } from 'react';
import useFetch from "../../hooks/useFetch";
import ItemCategoryModel from "../../Models/ItemCategoryModel";
import api_endpoints from "../../Utils/api.endpoints";
import './Modal.css';
import axios from "axios";

interface props {
    item: ItemModel;
    editView: boolean;
}

export default function Modal({ item, editView }: props): JSX.Element {
    const initialFormData = {
        item_id: item.item_id,
        category_name: item.category_name,
        item_name: item.item_name,
        quantity: item.quantity,
        expiration_date: new Date(item.expiration_date).toLocaleDateString('en-CA'),
        qr_image: item.qr_image,
        user_id: item.user_id
    }
    const [formData, setFormData] = useState(initialFormData);
    const [editState, setEditState] = useState<{ inputChanged: boolean, editError: string, editDone: boolean }>
        ({ inputChanged: false, editError: "", editDone: false });
    const { data: categories, loading, error, reFetch } = useFetch(`${api_endpoints.GET_CATEGORIES}`, null, null);
    const allCategories = categories as ItemCategoryModel[];


    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.querySelector('.qrCode')?.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditState({ inputChanged: true, editError: editState.editError, editDone: false });
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const editSelectedItem = async () => {
        try {
            if (editState.inputChanged) {
                const editedItem = await axios.put(`${api_endpoints.EDIT_ITEM}`, formData);
                console.log(editedItem);
                console.log(formData);
            }
            setEditState({ inputChanged: editState.inputChanged, editError: editState.editError, editDone: true });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <span>
            {!editView ?
                <div className="ModalGrid">
                    <div className="gridRow">
                        <div className="qrCode" style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={item.qr_image}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </div>
                    <div className="gridRow">
                        <button onClick={handlePrint}>Print</button>
                    </div>
                    <div className="gridRow">
                        Expires - &nbsp;
                        {new Date(item.expiration_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </div>
                    <div className="gridRow">
                        {item.category_name} - {item.item_name}
                    </div>
                </div>
                :
                <div className="ModalGridEdit">
                    <div className="gridRow">
                        <select name="category_name" value={formData.category_name} onChange={handleInputChange}>
                            {Array.isArray(allCategories) && allCategories.map((category: ItemCategoryModel) => (
                                <option key={category.category_id} placeholder={item.category_name} value={category.category_name}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="gridRow">
                        <input type="text" name="item_name" value={formData.item_name} onChange={handleInputChange}
                            placeholder={item.item_name} />
                    </div>
                    <div className="gridRow">
                        <input type="number" name="quantity" value={formData.quantity} min={1} onChange={handleInputChange}
                            placeholder={item.quantity} />
                    </div>
                    <div className="gridRow">
                        <input type="date" placeholder={item.expiration_date} name="expiration_date"
                            value={formData.expiration_date} onChange={handleInputChange} />
                    </div>
                    <div className="gridRow">
                        <button onClick={editSelectedItem} disabled={!editState.inputChanged && editState.editError == ""}>
                            Update info
                        </button>
                    </div>
                    <div className="gridRow">
                        {editState.editDone ?
                            <span>Item edited succesfully !</span>
                            :
                            null
                        }
                    </div>
                </div>
            }
        </span>
    )
}
