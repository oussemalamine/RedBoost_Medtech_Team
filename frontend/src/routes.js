import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Events = React.lazy(() => import('./components/Events/Events'))
const CreateEvents = React.lazy(() => import('./components/Events/CreateEvent'))
const User = React.lazy(() => import('./components/profile/UserProfile'))
const EntrepConacts = React.lazy(() => import('./components/contacts/EntrepConacts'))
const allContacts = React.lazy(() => import('./views/contacts/AllContact'))
const ProgramCards = React.lazy(() => import('./components/ProgramMonitoring/ProgramCards'))
const MainDatabaseManager = React.lazy(() => import('./views/dataBaseManager/MainDatabaseManager'))
const CreateContact = React.lazy(() => import('./views/contacts/CreateContact'))
const Users = React.lazy(() => import('./views/users/users'))
const TaskValidation = React.lazy(() => import('./views/TaskValidation/TaskValidation'))
const StatisticsEntrepeneurs = React.lazy(() => import('./views/Statistics/EntrepreneurStat'))
const ProgramsStatistics = React.lazy(()=> import('./views/Statistics/ProgramsStatistics'))

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
  { path: '/allContacts', name: 'All Contacts', element: allContacts },
  { path: '/Contacts/EntrepConacts', name: 'Entrepreneurs Contacts', element: EntrepConacts },
  { path: '/statistics/entrepreneurs', name: 'StatisticsEntrepeneurs', element: StatisticsEntrepeneurs },
  { path: '/statistics/programs', name: 'StatisticsPrograms', element: ProgramsStatistics },
]

export default routes
