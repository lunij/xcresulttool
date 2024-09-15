## Testing project TAU with scheme TAUUITests

<table>
<tr>
  <td align="right" colspan="2"><b>3</b></td>
</tr>
<tr>
  <td align="right">Passed&nbsp;&nbsp;<img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top"></td>
  <td align="right"><b>1</b></td>
</tr>
<tr>
  <td align="right">Failed&nbsp;&nbsp;<img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"></td>
  <td align="right"><b>2</b></td>
</tr>
<tr>
  <td align="right" colspan="2">18.31s</td>
</tr>
</table>

---

### Test Summary

#### <a name="tauuitests_summary"/>[TAUUITests](#user-content-tauuitests)

- **Device:** iPhone 13 mini, 15.0 (19A339)
- **SDK:** Simulator - iOS 15.0, 15.0
<table>
<tr>
  <th>Test</th>
  <th>Total</th>
  <th><img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top"></th>
  <th><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"></th>
  <th><img src="https://xcresulttool-static.netlify.app/i/skipped.png" alt="Skipped" title="Skipped" width="14px" align="top"></th>
  <th><img src="https://xcresulttool-static.netlify.app/i/expected-failure.png" alt="Expected Failure" title="Expected Failure" width="14px" align="top"></th>
</tr>
<tr>
  <td align="left" width="368px"><a name="tauuitests_bddtest_summary"/><a href="#user-content-tauuitests_bddtest">BDDTest</a></td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">0</td>
</tr>
<tr>
  <td align="left" width="368px"><a name="tauuitests_tauuitests_summary"/><a href="#user-content-tauuitests_tauuitests">TAUUITests</a></td>
  <td align="right" width="80px">2</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">0</td>
</tr>
</table>

---

### Failures
<h4><a name="tauuitests_bddtest/testthankyoumessageinbdstyle()_failure-summary"/><a href="#user-content-tauuitests_bddtest/testthankyoumessageinbdstyle()">TAUUITests/BDDTest/testThankYouMessageInBDStyle()</a></h4>
<table><tr><td align="right" width="100px"><b>File</b><td width="668px">/Users/katsumi/Downloads/XCUITest-TAU-chapter4/TAUUITests/BDDTest.swift:40<tr><td align="right" width="100px"><b>Issue Type</b><td width="668px">Assertion Failure<tr><td align="right" width="100px"><b>Message</b><td width="668px">Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11)</table>

<h4><a name="tauuitests_tauuitests/testthankyoumessage()_failure-summary"/><a href="#user-content-tauuitests_tauuitests/testthankyoumessage()">TAUUITests/TAUUITests/testThankYouMessage()</a></h4>
<table><tr><td align="right" width="100px"><b>File</b><td width="668px">/Users/katsumi/Downloads/XCUITest-TAU-chapter4/TAUUITests/TAUUITests.swift:24<tr><td align="right" width="100px"><b>Issue Type</b><td width="668px">Assertion Failure<tr><td align="right" width="100px"><b>Message</b><td width="668px">Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11)</table>
