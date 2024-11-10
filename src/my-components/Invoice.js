import React from 'react';
import { useLocation } from 'react-router-dom';

function Invoice() {
    const location = useLocation();
    const { customerData = {}, repairData = {}, courtesyItems = {}, costData = {} } = location.state || {};

    // Generate a unique job number for invoice
    const generateJobNumber = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `JOB-${timestamp}-${random}`;
    };

    // Format today's date to 24hr
    const formatInvoiceDate = () => {
        return new Date().toLocaleString('en-NZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    //making the payment due date 5 days from(todays date)
    const formatDueDate = () => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 5); // Add 5 days
        return dueDate.toLocaleString('en-NZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-NZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    
    const jobNumber = generateJobNumber();
    const today = formatInvoiceDate();
    const paymentDueDate = formatDueDate(); // Get the payment due date

    // Function to format the customer's address by combining the street, suburb, city, and postcode
    const formatAddress = () => {
        const parts = [
            customerData.street,
            customerData.suburb,
            `${customerData.city} ${customerData.postcode}`
        ].filter(Boolean);
        return parts.join(', ');
    };

    // Destructuring cost data to get bond, service fee, and totals
    const bond = costData.bond || 0;
    const serviceFee = costData.serviceFee || 0;
    const totalExcludingGST = costData.totalExcludingGST || 0;
    const gst = costData.gst || 0;
    const totalIncludingGST = costData.totalIncludingGST || 0;

    return (
        <div className="invoice-container border mx-auto" style={{ maxWidth: '800px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
            {/* styles for printing */}
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .invoice-container, .invoice-container * {
                            visibility: visible;
                        }
                        .invoice-container {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        /* Optionally hide footer and other non-essential content */
                        .footer {
                            display: none;
                        }
                    }
                `}
            </style>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#4f6368', color: 'white' }}>
                <h2 className="m-0">Repair Booking</h2>
                <div className="text-end">
                    <p className="m-0" style={{ fontSize: '18px' }}>Amount Due</p>
                    <h3 className="m-0">${totalIncludingGST.toFixed(2)}</h3>
                </div>
            </div>

            {/* Customer and Repair Job Info */}
            <div className="row p-3 mx-0">
                <div className="col-6 ps-0">
                    <h5 className="fw-bold">Customer</h5>
                    <p>
                        {`${customerData.title} ${customerData.firstName} ${customerData.lastName}`}<br />
                        {formatAddress()}<br />
                        {customerData.phoneNumber}<br />
                        {customerData.email}
                    </p>
                </div>
                <div className="col-6 text-end pe-0">
                    <h5 className="fw-bold">Repair Job</h5>
                    <p>
                        <strong>Job Number:</strong> {jobNumber}<br />
                        <strong>Invoice Date:</strong> {today}<br />
                        <strong>Payment Due:</strong> {paymentDueDate}
                    </p>
                </div>
            </div>

            <hr className="mx-3" />

            {/* Repair Details */}
            <div className="p-3">
                <div className="mb-4 ps-0">
                    <h5 className="fw-bold">Repair Details</h5>
                    <p>
                        <strong>Purchase Date:</strong> {formatDate(repairData.purchaseDate)}<br />
                        <strong>Repair Date:</strong> {formatDate(repairData.repairDate)}<br />
                        <strong>Under Warranty:</strong> {repairData.warranty ? "Yes" : "No"}<br />
                        <strong>IMEI:</strong> {repairData.imei}<br />
                        <strong>Make:</strong> {repairData.make}<br />
                        <strong>Model Number:</strong> {repairData.modelN}<br />
                        <strong>Fault Category:</strong> {repairData.faultCategory}<br />
                        <strong>Description:</strong> {repairData.description}<br />
                    </p>
                </div>
                {/* Courtesy Loan Device Details */}
                <div className="ps-0">
                    <h5 className="fw-bold">Courtesy Loan Device Details</h5>
                    <div style={{ maxWidth: '400px' }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courtesyItems.phone && (
                                    <tr>
                                        <td>{courtesyItems.phone.name}</td>
                                        <td>${courtesyItems.phone.bond}</td>
                                    </tr>
                                )}
                                {courtesyItems.charger && (
                                    <tr>
                                        <td>{courtesyItems.charger.name}</td>
                                        <td>${courtesyItems.charger.bond}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <hr className="mx-3" />

            {/* Totals */}
            <div className="p-3 d-flex justify-content-end">
                <div style={{ width: '300px' }}>
                    <h5 className="fw-bold">Totals</h5>
                    <p className="ps-3"><strong>Bond:</strong> ${bond.toFixed(2)}</p>
                    <p className="ps-3"><strong>Service Fee:</strong> ${serviceFee.toFixed(2)}</p>
                    <p className="ps-3"><strong>Total (excluding GST):</strong> ${totalExcludingGST.toFixed(2)}</p>
                    <p className="ps-3"><strong>GST (15%):</strong> ${gst.toFixed(2)}</p>
                    <p className="ps-3"><strong>Total (+GST):</strong> ${totalIncludingGST.toFixed(2)}</p>
                </div>
            </div>

            <hr className="mx-3" />

            {/* Footer */}
            <div className="footer d-flex justify-content-between p-3" style={{ backgroundColor: '#f8f8f8' }}>
                <div>
                    <h6 className="fw-bold">Phone Fix Services</h6>
                    <p className="mb-0">42 Fixed It Drive<br />Gisborne</p>
                </div>
                <div className="text-end">
                    <h6 className="fw-bold">Contact Us</h6>
                    <p className="mb-0">Phone: 06876543</p>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
