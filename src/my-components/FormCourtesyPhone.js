import { useState, useEffect } from 'react';

// List of items to get bond values 
function FormCourtesyPhone({ passDataToParent, resetTrigger }) {
    const courtesyList = [
        { id: 0, type: 'none', name: 'none', bond: 0 },
        { id: 1, type: 'phone', name: 'iPhone 10', bond: 275 },
        { id: 2, type: 'phone', name: 'iPhone 14', bond: 300 },
        { id: 3, type: 'phone', name: 'iPhone 16', bond: 500 },
        { id: 4, type: 'phone', name: 'Samsung Galaxy', bond: 200 },
        { id: 5, type: 'phone', name: 'Nokia', bond: 150 },
        { id: 6, type: 'phone', name: 'Xiaomi', bond: 100 },
        { id: 7, type: 'charger', name: 'iPhone Charger', bond: 45 },
        { id: 8, type: 'charger', name: 'Samsung Charger', bond: 30 },
        { id: 9, type: 'charger', name: 'Nokia Charger', bond: 25 },
        { id: 10, type: 'charger', name: 'Xiaomi Charger', bond: 25 }
    ];

    // Set initial state to "none" (0) for both phone and charger
    const [phoneBorrow, setPhoneBorrow] = useState(0);
    const [chargerBorrow, setChargerBorrow] = useState(0);
    const [lastResetTrigger, setLastResetTrigger] = useState(resetTrigger);

    // Add phone and pass the cost/bond data 
    let addPhone = (selectedOption) => {
        const selectedPhone = selectedOption === 'none' ? null : courtesyList.find(item => item.id === Number(selectedOption));
        setPhoneBorrow(selectedPhone ? selectedPhone.id : 0);
        passDataToParent({
            phone: selectedPhone,
            charger: courtesyList.find(item => item.id === chargerBorrow),
            totalBond: (selectedPhone ? selectedPhone.bond : 0) + (courtesyList.find(item => item.id === chargerBorrow)?.bond || 0)
        });
    };

    // Add charger and pass the cost/bond data 
    let addCharger = (selectedOption) => {
        const selectedCharger = selectedOption === 'none' ? null : courtesyList.find(item => item.id === Number(selectedOption));
        setChargerBorrow(selectedCharger ? selectedCharger.id : 0);
        passDataToParent({
            phone: courtesyList.find(item => item.id === phoneBorrow),
            charger: selectedCharger,
            totalBond: (courtesyList.find(item => item.id === phoneBorrow)?.bond || 0) + (selectedCharger ? selectedCharger.bond : 0)
        });
    };

    // Reset the phone and charger section 
    useEffect(() => {
        if (resetTrigger !== lastResetTrigger) {
            setPhoneBorrow(0);  // Reset to "none"
            setChargerBorrow(0);  // Reset to "none"
            passDataToParent({ phone: null, charger: null, totalBond: 0 });
            setLastResetTrigger(resetTrigger);
        }
    }, [resetTrigger, lastResetTrigger, passDataToParent]);

    return (
        <>
            {/* Phone selection */}
            <h2>Courtesy Phone</h2>
            <h4>Choose a phone: </h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select className="col-12 col-md-12 col-lg-7" id="phoneList" 
                        value={phoneBorrow} // Set the selected value to phoneBorrow
                        onChange={(selected) => addPhone(selected.target.value)}>
                    <option value="0">None</option> {/* Set value to 0 */}
                    <option value="1">iPhone 10</option>
                    <option value="2">iPhone 14</option>
                    <option value="3">iPhone 16</option>
                    <option value="4">Samsung Galaxy</option>
                    <option value="5">Nokia</option>
                    <option value="6">Xiaomi</option>
                </select>
            </div>
            
            {/* Charger selection */}
            <h4>Choose a charger: </h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select className="col-12 col-md-12 col-lg-7" id="chargerList" 
                        value={chargerBorrow} // Set the selected value to chargerBorrow
                        onChange={(selected) => addCharger(selected.target.value)}>
                    <option value="0">None</option> {/* Set value to 0 */}
                    <option value="7">iPhone Charger</option>
                    <option value="8">Samsung Charger</option>
                    <option value="9">Nokia Charger</option>
                    <option value="10">Xiaomi Charger</option>
                </select>
            </div>

            {/* Table of added Courtesy items */}
            <div className="row mt-2 ms-3 me-3 bg-white">
                <table className="table table-bordered" id="borrowItems">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneBorrow > 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === phoneBorrow)?.name || 'None'}</td>
                                <td>${courtesyList.find(item => item.id === phoneBorrow)?.bond || 0}</td>
                            </tr>
                        )}
                        {chargerBorrow > 0 && (
                            <tr>
                                <td>{courtesyList.find(item => item.id === chargerBorrow)?.name || 'None'}</td>
                                <td>${courtesyList.find(item => item.id === chargerBorrow)?.bond || 0}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormCourtesyPhone;
