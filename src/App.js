import './App.css';
import { Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './components/Shared/Footer/Footer';
import Dashboard from './Pages/Dashboard';
import RequireAuth from './components/Shared/RequireAuth';
import AddLead from './Pages/Seller/AddLead';
import FindLeads from './Pages/Buyer/FindLeads';
import Admin from './Pages/Admin';
import AddAdmin from './Pages/Admin/AddAdmin';
import AllLeads from './Pages/Admin/AllLeads';
import PendingLeads from './Pages/Admin/PendingLeads';
import LeadApprove from './Pages/Admin/LeadApprove';
import SellerUpdateProfile from './Pages/Seller/SellerUpdateProfile';
import BuyerUpdateProfile from './Pages/Buyer/BuyerUpdateProfile';
import CreateList from './Pages/Buyer/CreateList';
import AllUsers from './Pages/Admin/AllUsers';
import UpdateUser from './Pages/Admin/UpdateUser';
import LeadCollection from './Pages/Buyer/LeadCollection';
import MyCollections from './Pages/Buyer/MyCollections';
import MyAllCollections from './Pages/Buyer/MyAllCollections';
import AllLists from './Pages/Buyer/AllLists';
import DepositFunds from './Pages/Buyer/DepositFunds';
import Deposit10USD from './Pages/Buyer/Deposit10USD';
import Deposit20USD from './Pages/Buyer/Deposit20USD';
import Deposit50USD from './Pages/Buyer/Deposit50USD';
import DepositSuccess10 from './Pages/Buyer/DepositSuccess10';
import DepositSuccess20 from './Pages/Buyer/DepositSuccess20';
import DepositSuccess50 from './Pages/Buyer/DepositSuccess50';
import PendingAmountToProvider from './Pages/Admin/PendingAmountToProvider';
import UpdateProviderAmount from './Pages/Admin/UpdateCollectedLeadStatus';
import UpdateCollectedLeadStatus from './Pages/Admin/UpdateCollectedLeadStatus';
import AddBalanceToProvider from './Pages/Admin/AddBalanceToProvider';
import NewWithdrawal from './Pages/Seller/NewWithdrawal';
import WithdrawalHistory from './Pages/Seller/WithdrawalHistory';
import PendingWithdraws from './Pages/Admin/PendingWithdraws';
import WithdrawStatusChange from './Pages/Admin/WithdrawStatusChange';
import UpdateUserBalance from './Pages/Admin/UpdateUserBalance';
import AllBuyers from './Pages/Admin/AllBuyers';
import AllAdmins from './Pages/Admin/AllAdmins';
import EditBuyer from './Pages/Admin/EditBuyer';
import EditAdmin from './Pages/Admin/EditAdmin';
import AllWithdraws from './Pages/Admin/AllWithdraws';
import SearchLeads from './Pages/Buyer/SearchLeads';
import EditSellerProfile from './Pages/Seller/EditSellerProfile';
import EditBuyerProfile from './Pages/Buyer/EditBuyerProfile';
import DepositHistory from './Pages/Buyer/DepositHistory';
import BannerEdit from './Pages/Admin/OptionEdit/BannerEdit';
import ProviderLogin from './Pages/ProviderLogin';
import ProviderRegister from './Pages/ProviderRegister';
import AddAnotherLead from './Pages/Seller/AddAnotherLead';
import AddLeadSuperUser from './Pages/Seller/AddLeadSuperUser';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/add-lead' element={<RequireAuth><AddLead></AddLead></RequireAuth>}></Route>
        <Route path='/super' element={<RequireAuth><AddLeadSuperUser></AddLeadSuperUser></RequireAuth>}></Route>
        <Route path='/add-another-lead' element={<RequireAuth><AddAnotherLead></AddAnotherLead></RequireAuth>}></Route>


        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>

        <Route path='/provider-login' element={<ProviderLogin></ProviderLogin>}></Route>
        <Route path='/provider-register' element={<ProviderRegister></ProviderRegister>}></Route>


        <Route path='/find-leads/:id' element={<RequireAuth><FindLeads></FindLeads></RequireAuth>}></Route>
        <Route path='/search-leads/:id' element={<RequireAuth><FindLeads></FindLeads></RequireAuth>}></Route>
        <Route path='/take-lead/:id' element={<RequireAuth><LeadCollection></LeadCollection></RequireAuth>}></Route>
        <Route path='/create-list' element={<RequireAuth><CreateList></CreateList></RequireAuth>}></Route>
        <Route path='/my-collection/:id' element={<RequireAuth><MyCollections></MyCollections></RequireAuth>}></Route>
        <Route path='/my-all-leads/' element={<RequireAuth><MyAllCollections></MyAllCollections></RequireAuth>}></Route>
        <Route path='/all-lists/' element={<RequireAuth><AllLists></AllLists></RequireAuth>}></Route>
        <Route path='/deposit-funds/' element={<RequireAuth><DepositFunds></DepositFunds></RequireAuth>}></Route>
        <Route path='/deposit-history/:id' element={<RequireAuth><DepositHistory></DepositHistory></RequireAuth>}></Route>
        <Route path='/deposit10usd/' element={<RequireAuth><Deposit10USD></Deposit10USD></RequireAuth>}></Route>
        <Route path='/deposit20usd/' element={<RequireAuth><Deposit20USD></Deposit20USD></RequireAuth>}></Route>
        <Route path='/deposit50usd/' element={<RequireAuth><Deposit50USD></Deposit50USD></RequireAuth>}></Route>

        <Route path='/deposit-success-10usd/:id' element={<RequireAuth><DepositSuccess10></DepositSuccess10></RequireAuth>}></Route>
        <Route path='/deposit-success-20usd/:id' element={<RequireAuth><DepositSuccess20></DepositSuccess20></RequireAuth>}></Route>
        <Route path='/deposit-success-50usd/:id' element={<RequireAuth><DepositSuccess50></DepositSuccess50></RequireAuth>}></Route>



        <Route path='/admin' element={<RequireAuth><Admin></Admin></RequireAuth>}></Route>
        <Route path='/seller-update-profile' element={<RequireAuth><SellerUpdateProfile></SellerUpdateProfile></RequireAuth>}></Route>
        <Route path='/user-profile-edit/:id' element={<RequireAuth><EditSellerProfile></EditSellerProfile></RequireAuth>}></Route>
        <Route path='/new-withdraw/:id' element={<RequireAuth><NewWithdrawal></NewWithdrawal></RequireAuth>}></Route>
        <Route path='/withdrawal-history' element={<RequireAuth><WithdrawalHistory></WithdrawalHistory></RequireAuth>}></Route>


        <Route path='/buyer-update-profile' element={<RequireAuth><BuyerUpdateProfile></BuyerUpdateProfile></RequireAuth>}></Route>
        <Route path='/buyer-profile-edit/:id' element={<RequireAuth><EditBuyerProfile></EditBuyerProfile></RequireAuth>}></Route>


        <Route path='/admin/add-admin' element={<RequireAuth><AddAdmin></AddAdmin></RequireAuth>}></Route>
        <Route path='/admin/all-users' element={<RequireAuth><AllUsers></AllUsers></RequireAuth>}></Route>
        <Route path='/admin/all-buyers' element={<RequireAuth><AllBuyers></AllBuyers></RequireAuth>}></Route>
        <Route path='/admin/buyer-edit/:id' element={<RequireAuth><EditBuyer></EditBuyer></RequireAuth>}></Route>

        <Route path='/admin/all-admins' element={<RequireAuth><AllAdmins></AllAdmins></RequireAuth>}></Route>
        <Route path='/admin/admin-update/:id' element={<RequireAuth><EditAdmin></EditAdmin></RequireAuth>}></Route>
        <Route path='/admin/user/:id' element={<RequireAuth><UpdateUser></UpdateUser></RequireAuth>}></Route>
        <Route path='/admin/all-leads' element={<RequireAuth><AllLeads></AllLeads></RequireAuth>}></Route>
        <Route path='/admin/pending-leads' element={<RequireAuth><PendingLeads></PendingLeads></RequireAuth>}></Route>
        <Route path='/admin/pending-amount-to-provider' element={<RequireAuth><PendingAmountToProvider></PendingAmountToProvider></RequireAuth>}></Route>
        <Route path='/admin/update-collected-lead-status/:id' element={<RequireAuth><UpdateCollectedLeadStatus></UpdateCollectedLeadStatus></RequireAuth>}></Route>
        <Route path='/admin/update-user-balance/:id' element={<RequireAuth><AddBalanceToProvider></AddBalanceToProvider></RequireAuth>}></Route>
        <Route path='/admin/lead-approve/:id' element={<RequireAuth><LeadApprove></LeadApprove></RequireAuth>}></Route>
        <Route path='/admin/pending-withdraws/' element={<RequireAuth><PendingWithdraws></PendingWithdraws></RequireAuth>}></Route>
        <Route path='/admin/all-withdraws/' element={<RequireAuth><AllWithdraws></AllWithdraws></RequireAuth>}></Route>
        <Route path='/admin/update-withdrawal-status/:id' element={<RequireAuth><WithdrawStatusChange></WithdrawStatusChange></RequireAuth>}></Route>
        <Route path='/admin/update-balance/:id' element={<RequireAuth><UpdateUserBalance></UpdateUserBalance></RequireAuth>}></Route>


        <Route path='/admin/banner-edit/:id' element={<RequireAuth><BannerEdit></BannerEdit></RequireAuth>}></Route>
      </Routes>

      
    </div>
  );
}

export default App;
