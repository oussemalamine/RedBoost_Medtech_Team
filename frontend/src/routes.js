import { element } from 'prop-types'
import React from 'react'
import EntrepreneursTable from './views/entrepeneur/entrepeneursTable'
import entrepeneurDetails from './views/entrepeneur/entrepeneurDetails'
import CategoryMain from './views/category/categoryMain'
import AddCategoryPage from './views/category/addCategory'
import AllContacts from './views/contacts/AllContacts'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Events = React.lazy(() => import('./components/Events/Events'))
const CreateEvents = React.lazy(() => import('./components/Events/CreateEvent'))
const User = React.lazy(() => import('./components/profile/UserProfile'))
const EntrepConacts = React.lazy(() => import('./components/contacts/EntrepConacts'))
const ProgramCards = React.lazy(() => import('./components/ProgramMonitoring/ProgramCards'))
const MainDatabaseManager = React.lazy(() => import('./views/dataBaseManager/MainDatabaseManager'))
const CreateContact = React.lazy(() => import('./views/contacts/CreateContact'))
const Users = React.lazy(() => import('./views/users/users'))
const TaskValidation = React.lazy(() => import('./views/TaskValidation/TaskValidation'))
const StatisticsEntrepeneurs = React.lazy(() => import('./views/Statistics/EntrepreneurStat'))



const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/Dash', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', element: User },
  { path: '/Database', name: 'Database Manager', element: MainDatabaseManager },
  {
    path: '/Monitoring',
    name: 'Program Monitoring',
    element: ProgramCards,
  },
  { path: '/users', name: 'Users', element: Users },
  { path: '/events', name: 'All events', element: Events },
  { path: '/Validation', name: 'Validation', element: TaskValidation },
  { path: '/CreateEvent', name: 'Create Events', element: CreateEvents },
  { path: '/CreateContact', name: 'Create Contact', element: CreateContact },
  { path: '/allContacts', name: 'All Contacts', element: AllContacts },
  { path: '/Contacts/EntrepConacts', name: 'Entrepreneurs Contacts', element: EntrepConacts },
  {
    path: '/statistics/entrepreneurs',
    name: 'StatisticsEntrepeneurs',
    element: StatisticsEntrepeneurs,
  },
  
  { path: '/entrepeneurs', name: 'Entrepeneurs', element: EntrepreneursTable },
  { path: '/entrepeneurs/:id', name: ' entrepeneur', element: entrepeneurDetails },
  { path: '/category', name: ' categories', element: CategoryMain },
  { path: '/addCategory', name: 'category', element: AddCategoryPage },
]

export default routes