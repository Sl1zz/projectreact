import { useState } from 'react';
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useNavigate } from "react-router-dom";

function Home() {
    console.log("Rendering Home component");

    // State fto manage shared bond across components and hold courtesy phone items and there bond
    const [sharedBond, setSharedBond] = useState(0);
    const [selectedCourtesyItems, setSelectedCourtesyItems] = useState({
        phone: null,
        charger: null,
        totalBond: 0,
    });

    //track warrenty status, if customer is a business, and store user details
    const [sharedWarranty, setSharedWarranty] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [isBusiness, setIsBusiness] = useState(false);
    const [repairData, setRepairData] = useState({
        imei: '',
        make: '',
        modelN: '',
        faultCategory: '',
        description: ''
    });

    //Trigger reset in child
    const [resetTrigger, setResetTrigger] = useState(false);  // New resetTrigger state

    const navigate = useNavigate();

    // Handle courtesy phone data from FormCourtesyPhone
    const handleCourtesyPhoneData = (data) => {
        setSelectedCourtesyItems(data);
        setSharedBond(data.totalBond);
    };

    // Update repair data from FormRepairDetail component
    const handleRepairDataChange = (updatedRepairData) => {
        console.log("Updated Repair Data:", updatedRepairData);
        setRepairData(updatedRepairData);
    };

    // Update customer type (business or user) and adjust bond
    const handleCustomerTypeChange = (isBusiness) => {
        setIsBusiness(isBusiness);
        if (isBusiness) {
            setSharedBond(0);
        } else {
            setSharedBond(selectedCourtesyItems.totalBond);
        }
    };

    // Update customer data from FormCustomerDetails component
    const handleCustomerDataChange = (data) => {
        console.log("Updated Customer Data:", data);
        setCustomerData(data);
    };

    // Handle form submission, calculate costs, and navigate to the Invoice
    const onSubmit = async (event) => {
        event.preventDefault();
        
        const serviceFee = sharedWarranty ? 0 : 85;
        const totalExcludingGST = sharedBond + serviceFee;
        const gst = totalExcludingGST * 0.15;
        const totalIncludingGST = totalExcludingGST + gst;

        // Invoice stuff
        try {
            navigate("/invoice", { 
                state: { 
                    customerData, 
                    repairData, 
                    courtesyItems: selectedCourtesyItems, 
                    isBusiness,
                    costData: {
                        bond: sharedBond,
                        serviceFee,
                        totalExcludingGST,
                        gst,
                        totalIncludingGST,
                    }
                } 
            });
        } catch (e) {
            alert('ERROR!!!');
        }
    };

    // Reset the form and all related state data to default 
    const resetForm = () => {
        setSharedBond(0);
        setSelectedCourtesyItems({
            phone: null,
            charger: null,
            totalBond: 0,
        });
        setSharedWarranty(false);
        setCustomerData({});
        setIsBusiness(false);
        setRepairData({
            imei: '',
            make: '',
            modelN: '',
            faultCategory: '',
            description: ''
        });
        setResetTrigger(prev => !prev); // Toggle resetTrigger to reset
    };
    
    return (
        <form className="row" style={{ minHeight: '70vh' }} onSubmit={onSubmit}>
            {/* Customer Details */}
            <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '50vh', backgroundColor: '#FCF3CF' }}>
                <FormCustomerDetail 
                    passDataToParent={handleCustomerTypeChange} 
                    passCustomerData={handleCustomerDataChange}
                    resetTrigger={resetTrigger}  // Pass resetTrigger to reset form fields
                />
            </div>

            {/* Repair Details */}
            <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '40vh', backgroundColor: '#D5F5E3' }}>
                <FormRepairDetail 
                    setSharedWarranty={setSharedWarranty} 
                    passRepairData={handleRepairDataChange}
                    resetTrigger={resetTrigger}
                />
            </div>

            {/* Courtesy Phone & Cost */}
            <div className="col-12 col-lg-4 p-0 m-0" style={{ backgroundColor: '#EDBB99' }}>
                <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#54a9aa' }}>
                <FormCourtesyPhone  
                    passDataToParent={handleCourtesyPhoneData} 
                    resetTrigger={resetTrigger}
                />
                </div>
                <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
                    <FormCost 
                        sharedPropBond={sharedBond} 
                        sharedPropWarranty={sharedWarranty} 
                        sharedPropCustomer={isBusiness} 
                    />
                </div>
            </div>

            {/* Button area */}
            <div className="p-4 text-center" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
                <FormButtons onReset={resetForm} />
            </div>
        </form>
    );
}

export default Home;
