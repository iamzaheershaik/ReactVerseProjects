import { Routes, Route } from 'react-router';
import Header from './Component/Header';
import Home from './Component/Home';
import AddProduct from './Component/AddProduct';
import EditProduct from './Component/EditProduct';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default App;
