import { useContext, React } from 'react'
import './Payment.css'
import { ShopContext } from "../../Context/ShopContext";
import khaltiLogo from '../Assets/khalti-logo-F0B049E67E-seeklogo.com.png'
import qr from '../Assets/qr.jpeg'
const Payment = () => {
  return (
    <div className='container'>
      <div className="card">
        <img src={khaltiLogo} className="khalti-logo" alt="Khalti logo" />
        <h3>Scan the QR code to pay</h3>
        <img src={qr} alt="Qr for payment" className="qr" />
        <h3>Remarks: Put your email in remarks.</h3>
      </div>
    </div>
  )
}

export default Payment
