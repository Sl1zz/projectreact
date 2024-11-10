function FormCost(props) {
    // Component UI: HTML Rendering
    return (
        <>
            <h2>Cost</h2>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Bond</label>
                <input className="col-12 col-md-12 col-lg-7" type="text"
                    value={`$${props.sharedPropBond.toFixed(2)}`} id="bond" readOnly />
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Service Fee</label>
                <input className="col-12 col-md-12 col-lg-7" type="text"
                    value={`$${(props.sharedPropWarranty ? 0 : 85).toFixed(2)}`} id="serviceFee" readOnly />
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total (excluding GST)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text"
                    value={`$${(props.sharedPropBond + (props.sharedPropWarranty ? 0 : 85)).toFixed(2)}`} id="totalExcludingGST" readOnly />
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">GST (15%)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text"
                    value={`$${((props.sharedPropBond + (props.sharedPropWarranty ? 0 : 85)) * 0.15).toFixed(2)}`} id="gst" readOnly />
            </div>

            <div className="row mt-1 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Total (including GST)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text"
                    value={`$${((props.sharedPropBond + (props.sharedPropWarranty ? 0 : 85)) * 1.15).toFixed(2)}`} id="totalIncludingGST" readOnly />
            </div>

        </>
    );

}

// Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;