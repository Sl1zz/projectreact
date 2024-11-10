import React, { useState, useEffect } from 'react';

// Gathering initial data 
function FormCustomerDetail({ passDataToParent, passCustomerData, resetTrigger }) {
    const initialData = {
        title: 'Mr',
        firstName: '',
        lastName: '',
        street: '',
        suburb: '',
        city: '',
        postcode: '',
        phoneNumber: '',
        email: '',
    };

    const [customerData, setCustomerData] = useState(initialData);

    useEffect(() => {
        // Reset customer data when resetTrigger changes
        setCustomerData(initialData);
    }, [resetTrigger]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...customerData, [name]: value };
        setCustomerData(updatedData);
        passCustomerData(updatedData); // Pass updated customer data to parent
    };

    const customerType = (event) => {
        const isBusiness = event.target.value === 'business';
        passDataToParent(isBusiness);
    };

    // Component UI: HTML Rendering
    return (
        <>
            <h2>Customer Details</h2>
            {/* Customer type */}
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                    <legend className="col-11 float-none w-auto">Customer type *</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Customer</label>
                        <input type="radio" id="customerType" name="customer-type" defaultChecked onChange={customerType} value="customer" />
                    </div>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Business</label>
                        <input type="radio" id="businessType" name="customer-type" onChange={customerType} value="business" />
                    </div>
                </fieldset>
            </div>

            {/* Details plus all validation requirements */}
            <div className="row mt-2">
                <label className="col-12 col-md-12 col-lg-4">Title: *</label>
                <select className="col-12 col-md-12 col-lg-7" name="title" value={customerData.title} onChange={handleChange}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                    <option value="Sir">Sir</option>
                    <option value="Duke">Duke</option>
                </select>
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">First Name: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="firstName"
                    value={customerData.firstName}
                    onChange={handleChange}
                    required
                    pattern="[A-Za-z\s\-]+"
                    title="Only alphabetical characters, spaces, and the – symbol are allowed"
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Last Name: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="lastName"
                    value={customerData.lastName}
                    onChange={handleChange}
                    required
                    pattern="[A-Za-z\s\-]+"
                    title="Only alphabetical characters, spaces, and the – symbol are allowed"
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Street: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="street"
                    value={customerData.street}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Suburb:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="suburb"
                    value={customerData.suburb}
                    onChange={handleChange}
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">City: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="city"
                    value={customerData.city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Post Code:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="postcode"
                    value={customerData.postcode}
                    onChange={handleChange}
                    pattern="\d{4}"
                    title="Post code must be exactly 4 digits"
                    required
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Phone Number: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    name="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={handleChange}
                    required
                    pattern="\d{10}"
                    title="Phone number must be exactly 10 digits"
                />
            </div>
            <div className="row mt-1">
                <label className="col-12 col-md-12 col-lg-4">Email: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
}

export default FormCustomerDetail;
