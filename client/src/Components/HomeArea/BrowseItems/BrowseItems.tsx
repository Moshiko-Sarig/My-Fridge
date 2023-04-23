import './BrowseItems.css'
import ItemModel from '../../../Models/ItemModel'
import useFetch from '../../../hooks/useFetch'
import api_endpoints from '../../../Utils/api.endpoints'
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import axios from 'axios';


export default function BrowseItems(): JSX.Element {
  const { data: data, loading, error, reFetch } = useFetch(`${api_endpoints.GET_ITEMS}`, null, null);
  const allItems = data as ItemModel[];
  const [itemData, setItemData] = useState({ items: [], pageItems: []});
  const [showModal, setShowModal] = useState<{ isModalOpen: boolean, editView: boolean, selectedItem: ItemModel | null }>
    ({ isModalOpen: false, editView: false, selectedItem: undefined });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // set the initial state
    if (allItems) {
      setItemData({ items: allItems, pageItems: itemData.pageItems });
      const totalItems = allItems ? allItems.length : 0;
      const totalPages = Math.ceil(totalItems / 10);
      setTotalPages(totalPages);
    }

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const itemsForPage = allItems ? allItems.slice(startIndex, endIndex) : [];
    setItemData({ items: itemData.items, pageItems: itemsForPage });
  }, [allItems, currentPage]);

  function handleModalToggle(item: ItemModel): void {
    setShowModal({ isModalOpen: !showModal.isModalOpen, editView: showModal.editView, selectedItem: item });
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
        setItemData({ items: updatedItemData, pageItems: itemData.pageItems  });
      }
    }
  }

  const handleNextPage = () => {
    console.log(itemData.pageItems);

    if (currentPage < totalPages) {
      console.log(currentPage);
      console.log(itemData.pageItems);
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
      console.log(itemData.pageItems);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      console.log(currentPage);
      console.log(itemData.pageItems);
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
      console.log(itemData.pageItems);
    }
  };

  return (
    <div className='BrowseItems'>
      <div className='itemGrid'>
        <div className='spacer'></div>
        <div className='pageContent'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          <div>
            <table>
              <thead>
                <tr className='tableHeader'>
                  <th className='exp1'>Item name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Expiration date</th>
                  <th>QR image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(itemData.pageItems) && itemData.pageItems
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((item: ItemModel) => (
                    <tr className='tableData' key={item.item_id}>
                      <td className='td1'>{item.item_name}</td>
                      <td className='td2'>{item.category_name}</td>
                      <td className='td3'>{item.quantity}</td>
                      <td className='td4'>{new Date(item.expiration_date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                      })}</td>
                      <td className='td5'>
                        <button className='qrImage' onClick={() => handleModalToggle(item)}>Click mee</button>
                      </td>
                      <td className='td6'><button onClick={() => deleteItem(item)}>Delete</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              <button onClick={handlePrevPage}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage}>Next</button>
            </div>
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