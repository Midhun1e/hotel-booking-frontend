import React,{useState} from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ChangePassword from './../components/common/ChangePassword';
import ReceptionProfile from './../components/common/ReceptionProfile';
import {Lock} from '@material-ui/icons';
import '../../src/css/GuestDashboard.css'

function ReceptionDashboard({match}) {
    const [selectOption,setSelectOption] = useState('profile');
    const [activeProfileOption,setActiveProfileOption] = useState(false);
    return (
        <div className="guestDashboard">
            <div className="guestDashboard_menu">
                <ul className="guestDashboard_menuItems">
                    <li onClick={e => {setSelectOption('profile'); }} className={activeProfileOption && "active"}><PersonIcon /><div className="Content">Profile</div></li>
                    <li onClick={e => setSelectOption('password')}><Lock/><div className="Content">Password</div></li>
                </ul>
            </div>
           
            {(() => { if (selectOption === 'profile') return (<ReceptionProfile receptionId={match.params.receptionId} title={"Reception Profile"} description={"Basic info about reception account"}/>)
             else if (selectOption === 'password') return (<ChangePassword receptionId={match.params.receptionId} title="Change Password" />)
             })()}

            {/* <div className="guestDashboard_details">
               <DashboardContent />
            </div> */}
        </div>
    )
}

export default ReceptionDashboard
