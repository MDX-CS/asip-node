/**
 * Node.js library for the asip Arduino protocol
 *
 * @package asip-node
 * @author Pavel Koch <kouks.koch@gmail.com>
 */

import Asip from './Foundation/Asip';
import Listener from './Events/Listener';

/*
 |-----------------------------------------------------------------------
 | Load the Library
 |-----------------------------------------------------------------------
 |
 | Provide the Asip facade to the user.
 |
 */

export default Asip;

//
// Test area.
//

class TestListener extends Listener {
  open() {
    //
  }

  loop() {
    //
  }

  catch() {
    //
  }
}

Asip.listen(new TestListener());
