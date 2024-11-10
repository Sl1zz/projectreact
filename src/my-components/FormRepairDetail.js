import React, { useState, useEffect } from 'react';

//  Handle repair details input and hold repair details 
function FormRepairDetail({ setSharedWarranty, passRepairData, resetTrigger }) {
    const [repairData, setRepairData] = useState({
        imei: '',
        make: '',
        modelN: '',
        faultCategory: '',
        description: '',
    });

     // State for repair date, purchase date, warranty status, and warranty disabled flag
    const [repairDate, setRepairDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [warranty, setWarranty] = useState(false);
    const [warrantyDisabled, setWarrantyDisabled] = useState(false);

    useEffect(() => {
        // Reset all values when resetTrigger changes back to default
        setRepairData({
            imei: '',
            make: '',
            modelN: '',
            faultCategory: '',
            description: '',
        });
        setRepairDate('');
        setPurchaseDate('');
        setWarranty(false);
        setWarrantyDisabled(false);
        // pass the reset data to parent
        passRepairData({
            imei: '',
            make: '',
            modelN: '',
            faultCategory: '',
            description: '',
            repairDate: '',
            purchaseDate: '',
            warranty: false,
        });
    }, [resetTrigger]);  // Reset trigger to trigger reset

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...repairData, [name]: value };
        setRepairData(updatedData);
        passRepairData({ ...updatedData, repairDate, purchaseDate, warranty });
    };

    // Handle changes in the purchase date input field
    const handlePurchaseDateChange = (e) => {
        const newPurchaseDate = e.target.value;
        setPurchaseDate(newPurchaseDate);

        // Making sure repair date is not earlier than purchase date
        if (newPurchaseDate) {
            setRepairDate(prevRepairDate => (prevRepairDate < newPurchaseDate ? newPurchaseDate : prevRepairDate));
        }

        // Disable warranty if purchase date is more than 24 months ago
        const isDisabled = new Date(newPurchaseDate) <= twentyFourMonthsAgo;
        setWarrantyDisabled(isDisabled);
        setWarranty(!isDisabled ? warranty : false);

        passRepairData({ ...repairData, repairDate, purchaseDate: newPurchaseDate, warranty: !isDisabled && warranty });
    };

    // Handle changes in the repair date input field
    const handleRepairDateChange = (e) => {
        const newRepairDate = e.target.value;
        setRepairDate(newRepairDate);
        passRepairData({ ...repairData, repairDate: newRepairDate, purchaseDate, warranty });
    };

    // Update warranty status and pass it to the parent component
    const updateWarranty = (value) => {
        setWarranty(value);
        setSharedWarranty(value);
        passRepairData({ ...repairData, repairDate, purchaseDate, warranty: value });
    };

    const currentDate = new Date();
    const maxDate = currentDate.toISOString().split('T')[0];

    // Set minimum allowed purchase date to 10 years ago
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(currentDate.getFullYear() - 10);
    const minPurchaseDate = fiveYearsAgo.toISOString().split('T')[0];

    // Set minimum allowed purchase date to 24 months ago for warranty validity check
    const twentyFourMonthsAgo = new Date();
    twentyFourMonthsAgo.setMonth(currentDate.getMonth() - 24);

    return (
        <>
            {/* Repair section */}
            <h2>Repair Details</h2>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
                <input 
                    className="col-12 col-md-12 col-lg-7" 
                    type="date" 
                    required
                    max={maxDate} 
                    min={minPurchaseDate} 
                    value={purchaseDate} 
                    onChange={handlePurchaseDateChange} 
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
                <input 
                    className="col-12 col-md-12 col-lg-7" 
                    type="date" 
                    required
                    min={purchaseDate} 
                    value={repairDate} 
                    onChange={handleRepairDateChange} 
                />
            </div>
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                        <input 
                            type="checkbox" 
                            checked={warranty} 
                            onChange={(event) => updateWarranty(event.target.checked)} 
                            disabled={warrantyDisabled} 
                        />
                    </div>
                </fieldset>
            </div>
            {/* IMEI */}
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="imei"
                    name="imei" 
                    value={repairData.imei}
                    onChange={handleChange}
                    required
                    pattern="\d{15}"
                    title="IMEI must be exactly 15 digits long"
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Make *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="make"
                    name="make" 
                    value={repairData.make}
                    onChange={handleChange}
                    required
                >
                    <option value="Apple">Apple</option>
                    <option value="LG">LG</option>
                    <option value="Motorola">Motorola</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Model Number:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="number"
                    id="modelN"
                    name="modelN" 
                    value={repairData.modelN}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="faultCategory"
                    name="faultCategory" 
                    value={repairData.faultCategory}
                    onChange={handleChange}
                    required
                >
                    <option value="Screen">Screen</option>
                    <option value="Battery">Battery</option>
                    <option value="Charging">Charging</option>
                    <option value="SD-storage">SD-storage</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Description: *</label>
                <textarea
                    className="col-12 col-md-12 col-lg-7"
                    rows="8"
                    id="description"
                    name="description" 
                    value={repairData.description}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
}

export default FormRepairDetail;
