/** @jsx dom */

var { dom } = require("deku");

/**
 * @param {String} className - super class
 * @return {ReactElement} element
 */
function testFunction(className){
        return <div>
          <img src="avatar.png" className="profile" />
          <h3>{[user.firstName, user.lastName].join(' ')}</h3>
        </div>;
}