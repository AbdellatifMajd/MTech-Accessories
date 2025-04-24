import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import CheckAuth from './components/common/CheckAuth'
import NotFound from './pages/not-found'
import AdminLayout from './components/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminFeatures from './pages/admin/Features'
import AdminOrders from './pages/admin/Orders'
import AdminProducts from './pages/admin/Products'
import ShoppingLayout from './components/shopping/Layout'
import ShoppingAccount from './pages/shopping/Account'
import ShoppingHome from './pages/shopping/Home'
import ShoppingListing from './pages/shopping/Listing'
import { useSelector } from 'react-redux'

function App() {
  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  return (
    <Routes>

      <Route path='/' element={<NotFound/>}/>

      <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}> <AuthLayout/> </CheckAuth>}>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>} />
      </Route>

      <Route path='/admin' elemeny={<CheckAuth isAuthenticated={isAuthenticated} user={user}> <AdminLayout/> </CheckAuth>}>
        <Route path='dashboard' element={<AdminDashboard/>} />
        <Route path='features' element={<AdminFeatures/>} />
        <Route path='orders' element={<AdminOrders/>} />
        <Route path='products' element={<AdminProducts/>} />
      </Route>

      <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} > <ShoppingLayout/> </CheckAuth>} >
        <Route path='account' element={<ShoppingAccount/>} />
        <Route path='home' element={<ShoppingHome/>} />
        <Route path='listing' element={<ShoppingListing/>} />
      </Route>


    </Routes>
  )
}

export default App