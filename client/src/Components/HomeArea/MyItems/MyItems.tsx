import { useSelector } from 'react-redux';
import ItemModel from '../../../Models/ItemModel';
import api_endpoints from '../../../Utils/api.endpoints';
import useFetch from '../../../hooks/useFetch';
import { ReduxState } from '../../LayoutArea/Layout/Layout';
import './MyItems.css'




export default function MyItems(): JSX.Element {
  const logged = useSelector((state: ReduxState) => state.logged);
  const { data: items, loading, error, reFetch } = useFetch(`${api_endpoints.GET_USER_ITEMS}`, logged.userInfo.user_id, null);
  const allUserItems = items as ItemModel[];

  function editItem() {

  }
  function deleteItem() {

  }

  
  return (
    <div className='MyItems'>
      <h1>My items works</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="table100 ver1 m-b-110">
        <table data-vertable="ver1">
          <thead>
            <tr className="row100 head">
              <th className="column100 column1" data-column="column1">Item name</th>
              <th className="column100 column2" data-column="column2">Category</th>
              <th className="column100 column3" data-column="column3">Quantity</th>
              <th className="column100 column4" data-column="column4">Expiration date</th>
              <th className="column100 column5" data-column="column5">QR image</th>
              <th className="column100 column6" data-column="column6">Edit</th>
              <th className="column100 column7" data-column="column7">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allUserItems) && allUserItems.map((item: ItemModel) => (
              <tr className="row100">
                <td className="column100 column1" data-column="column1">{item.item_name}</td>
                <td className="column100 column2" data-column="column2">{item.category_name}</td>
                <td className="column100 column3" data-column="column3">{item.quantity}</td>
                <td className="column100 column4" data-column="column4">{new Date(item.expiration_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</td>
                <td className="column100 column5" data-column="column5">{item.qr_image}</td>
                <td className="column100 column6" data-column="column6"><button onClick={editItem}>Edit</button></td>
                <td className="column100 column7" data-column="column7"><button onClick={deleteItem}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}