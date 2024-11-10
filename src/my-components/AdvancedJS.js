import { useState } from 'react';
import DiscussionBoard from './discussionboard';
import NZMap from './NZMap';
import PhoneShowcase from './PhoneShowcase';
import AniPhone from './AnimatedPhone';
import RepairChatBot from './RepairChatbot';
//Function Component
function AdvancedJS() {
    const [clickedButton, setClickedButton] = useState(0);
    const toggleDemo = (index) => {
        setClickedButton(index);
    }
    //Auth dropdown
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return(<>
        {/* Authentication Statement with add toggle open close to save space */}
        <div className="bg-light bg-success bg-opacity-10">
      <div className="p-1">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 className="fw-semibold mb-1" style={{ marginRight: '10px' }}>
            Statement of authenticity
          </h2>
          <button
            onClick={toggleOpen}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0',
              color: 'black',
            }}
          >
            {isOpen ? '↑' : '↓'}
          </button>
        </div>
        <p className="text-secondary mb-1">I confirm that:</p>
        {isOpen && (
          <ul className="list-group list-group-flush ms-4">
            <li className="list-group-item bg-transparent border-0 ps-2 py-0">
              This is an original assessment and is entirely my own work.
            </li>
            <li className="list-group-item bg-transparent border-0 ps-2 py-0">
              It contains no material previously published or written by another person or myself except where due acknowledgement is made in the text.
            </li>
            <li className="list-group-item bg-transparent border-0 ps-2 py-0">
              No material which to a substantial extent, has been submitted for any other academic course, is included without acknowledgement.
            </li>
          </ul>
        )}
      </div>
    </div>
        <div style={{minHeight: '100vh'}}> 

            {/*BUTTONS AND DEMOS*/}
            <div className="row mt-2 p-0">

                {/*Column 1 */}
                <div className="col-12 col-md-2 bg-primary ">
                    <div className="row">
                        <button className="col-6 col-md-12 btn btn-outline-warning mb-1" onClick={() => toggleDemo(1)}>Start a thread! </button>
                        <button className="col-6 col-md-12 btn btn-outline-warning mb-1" onClick={() => toggleDemo(2)}> Move a phone</button>     
                        <button className="col-6 col-md-12 btn btn-outline-warning mb-1" onClick={() => toggleDemo(3)}>NZ Map </button>
                        <button className="col-6 col-md-12 btn btn-outline-warning mb-1" onClick={() => toggleDemo(4)}>PhoneShowcase </button>                  
                        <button className="col-6 col-md-12 btn btn-outline-warning mb-1" onClick={() => toggleDemo(5)}>ChatBot </button>
                    </div>
                </div>
                
               {/*Column 2*/}
                <div className="col-12 col-md-10 bg-secondary ">
                    <div className="row" style={{minHeight: '100vh'}}>                        
                        <div className="col-12" style={{display: clickedButton===1 ?'block': 'none'}}><DiscussionBoard /> </div> {/*Demo 1 */}                   
                        <div className="col-12" style={{display: clickedButton===2 ?'block': 'none'}}><AniPhone /> </div> {/*Demo 2 */}
                        <div className="col-12" style={{display: clickedButton===3 ?'flex': 'none'}}><NZMap /></div> {/*Demo 3 */}
                        <div className="col-12" style={{display: clickedButton===4 ?'block': 'none'}}><PhoneShowcase /> </div> {/*Demo 4 */}
                        <div className="col-12" style={{display: clickedButton===5 ?'block': 'none'}}><RepairChatBot/> </div> {/*Demo 5 */}
                    </div>
                </div>
            </div>            
        </div>        
    </>);
}


//Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS;
