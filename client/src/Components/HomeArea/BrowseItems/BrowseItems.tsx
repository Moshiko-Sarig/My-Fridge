import './BrowseItems.css'
import ItemModel from '../../../Models/ItemModel'
import useFetch from '../../../hooks/useFetch'
import api_endpoints from '../../../Utils/api.endpoints'


export default function BrowseItems(): JSX.Element {
  const { data: item, loading, error, reFetch } = useFetch(`${api_endpoints.GET_ITEMS}`, null);
  const allItems = item as ItemModel[];



  return (
    <div className='BrowseItems'>
      <h1>Browse items works !</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}


      {Array.isArray(allItems) && allItems.map((item: ItemModel) => ( // fill out to table wanted data 
        <div key={item.item_id}>
          <h3>{item.item_name}</h3>
          <h3>Category: {item.category_name}</h3>
        </div>
      ))}
    </div>
  )
}