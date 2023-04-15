import { useSelector } from 'react-redux';
import ItemModel from '../../../Models/ItemModel';
import api_endpoints from '../../../Utils/api.endpoints';
import useFetch from '../../../hooks/useFetch';
import { ReduxState } from '../../LayoutArea/Layout/Layout';
import Modal from '../Modal/Modal';
import { useEffect, useState } from 'react';
import './MyItems.css'
import axios from 'axios';



export default function MyItems(): JSX.Element {
  const logged = useSelector((state: ReduxState) => state.logged);
  const { data: data, loading, error, reFetch } = useFetch(`${api_endpoints.GET_USER_ITEMS}`, logged.userInfo.user_id, null);
  const allItems = data as ItemModel[];
  const [itemData, setItemData] = useState({ items: [] });
  const [showModal, setShowModal] = useState<{ isModalOpen: boolean, editView: boolean, selectedItem: ItemModel | null }>
    ({ isModalOpen: false, editView: false, selectedItem: undefined });

  useEffect(() => {
    if (allItems) {
      setItemData({ items: allItems });
    }
  }, [data]);

  function handleModalToggle(item: ItemModel): void {
    if (showModal.editView) {
      editItem(item);
    }
    else {
      setShowModal({ isModalOpen: !showModal.isModalOpen, editView: showModal.editView, selectedItem: item });
    }
  }
  function editItem(item: ItemModel) {
    setShowModal({ isModalOpen: !showModal.isModalOpen, editView: !showModal.editView, selectedItem: item });
  }
  async function deleteItem(item: ItemModel) {
    const index = itemData.items.findIndex(i => i.item_id === item.item_id);
    const deleteUrl = api_endpoints.DELETE_ITEM + `${item.item_id}`;
    if (index !== -1) {
      try {
        const response = await axios.delete(`${deleteUrl}`);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        const itemDataBeforeIndex = itemData.items.slice(0, index);
        const itemDataAfterIndex = itemData.items.slice(index + 1);
        const updatedItemData = [...itemDataBeforeIndex, ...itemDataAfterIndex];
        setItemData({ items: updatedItemData });
      }
    }
  }

  return (
    <div className='BrowseItems'>
      <div className='itemGrid'>
        <div className='pageTitle'>
          <h1>Browse items works !</h1>
        </div>
        <div className='spacer'></div>
        <div className='pageContent'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          <div className="table100 ver1 m-b-110">
            <table data-vertable="ver1">
              <thead>
                <tr className="row100 head">
                  <th>Item name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Expiration date</th>
                  <th>QR image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(itemData.items) && itemData.items.map((item: ItemModel) => (
                  <tr className="row100" key={item.item_id}>
                    <td>{item.item_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.quantity}</td>
                    <td>{new Date(item.expiration_date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit"
                    })}</td>
                    <td>
                      <button className='qrImage' onClick={() => handleModalToggle(item)}>Click mee</button>
                    </td>
                    <td><button onClick={() => editItem(item)}>Edit</button></td>
                    <td><button onClick={() => deleteItem(item)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal modal-popup" style={{ display: showModal.isModalOpen ? 'block' : 'none' }}
              onClick={(e) => { if (e.target === e.currentTarget) { handleModalToggle(undefined) } }}>
              <div className="modal-content">
                {showModal.isModalOpen ?
                  <Modal item={showModal.selectedItem} editView={showModal.editView}></Modal>
                  :
                  null
                }
                <span className="close" onClick={() => handleModalToggle(undefined)}>Close</span>
              </div>
            </div>
          </div>
        </div>
        <div className='spacer'></div>
      </div>
    </div>
  )
}