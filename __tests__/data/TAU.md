## Testing project TAU with scheme TAUUITests

<table>
<tr>
  <td></td>
  <td align="right"><b>3</b></td>
</tr>
<tr>
  <td><img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top">&nbsp;Passed</td>
  <td align="right"><b>1</b></td>
</tr>
<tr>
  <td><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top">&nbsp;Failed</td>
  <td align="right"><b>2</b></td>
</tr>
<tr>
  <td><img src="https://xcresulttool-static.netlify.app/i/skipped.png" alt="Skipped" title="Skipped" width="14px" align="top">&nbsp;Skipped</td>
  <td align="right"><b>0</b></td>
</tr>
<tr>
  <td><img src="https://xcresulttool-static.netlify.app/i/expected-failure.png" alt="Expected Failure" title="Expected Failure" width="14px" align="top">&nbsp;Expected Failure</td>
  <td align="right"><b>0</b></td>
</tr>
<tr>
  <td>:stopwatch:&nbsp;Time</td>
  <td align="right"><b>18.31s</b></td>
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
  <td align="left" width="368px"><a name="tauuitests_bddtest_summary"/><a href="#user-content-tauuitests_bddtest"><img src="https://xcresulttool-static.netlify.app/i/test-class.png" alt="test-class" width="14px" align="top">&nbsp;BDDTest</a></td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">0</td>
</tr>
<tr>
  <td align="left" width="368px"><a name="tauuitests_tauuitests_summary"/><a href="#user-content-tauuitests_tauuitests"><img src="https://xcresulttool-static.netlify.app/i/test-class.png" alt="test-class" width="14px" align="top">&nbsp;TAUUITests</a></td>
  <td align="right" width="80px">2</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">1</td>
  <td align="right" width="80px">0</td>
  <td align="right" width="80px">0</td>
</tr>
</table>

---

### <img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"> Failures
<h4><a name="tauuitests_bddtest/testthankyoumessageinbdstyle()_failure-summary"/><a href="#user-content-tauuitests_bddtest/testthankyoumessageinbdstyle()">TAUUITests/BDDTest/testThankYouMessageInBDStyle()</a></h4>
<table><tr><td align="right" width="100px"><b>File</b><td width="668px">/Users/katsumi/Downloads/XCUITest-TAU-chapter4/TAUUITests/BDDTest.swift:40<tr><td align="right" width="100px"><b>Issue Type</b><td width="668px">Assertion Failure<tr><td align="right" width="100px"><b>Message</b><td width="668px">Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11)</table>

<h4><a name="tauuitests_tauuitests/testthankyoumessage()_failure-summary"/><a href="#user-content-tauuitests_tauuitests/testthankyoumessage()">TAUUITests/TAUUITests/testThankYouMessage()</a></h4>
<table><tr><td align="right" width="100px"><b>File</b><td width="668px">/Users/katsumi/Downloads/XCUITest-TAU-chapter4/TAUUITests/TAUUITests.swift:24<tr><td align="right" width="100px"><b>Issue Type</b><td width="668px">Assertion Failure<tr><td align="right" width="100px"><b>Message</b><td width="668px">Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11)</table>


### Test Details

#### <a name="tauuitests"/>TAUUITests[<img src="https://xcresulttool-static.netlify.app/i/back.png" alt="back" width="14px" align="top">](#user-content-tauuitests_summary)

<a name="tauuitests_bddtest"/><h5>BDDTest&nbsp;[<img src="https://xcresulttool-static.netlify.app/i/back.png" alt="back" width="14px" align="top">](#user-content-tauuitests_bddtest_summary)</h5>
<table>
<tr>
<th><img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/skipped.png" alt="Skipped" title="Skipped" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/expected-failure.png" alt="Expected Failure" title="Expected Failure" width="14px" align="top"><th>:stopwatch:
<tr>
<td align="right" width="154px">0 (0%)<td align="right" width="154px"><b>1 (100%)</b><td align="right" width="154px">0 (0%)<td align="right" width="154px">0 (0%)<td align="right" width="154px">10.16s
</table>

<table>
<tr><td align="center" valign="top" width="52px"><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"><td valign="top" width="716px"><a name="tauuitests_bddtest/testthankyoumessageinbdstyle()"/><img src="https://xcresulttool-static.netlify.app/i/test-method.png" alt="test-method" width="14px" align="top">&nbsp;<code>testThankYouMessageInBDStyle()</code><a href="#user-content-tauuitests_bddtest/testthankyoumessageinbdstyle()_failure-summary"><img src="https://xcresulttool-static.netlify.app/i/back.png" alt="back" width="14px" align="top"></a><br><br><b>Activities:</b>

- Start Test at 2021-10-17 02:43:13.407
  <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Set Up
  - Open com.shashikant.TAU
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Launch com.shashikant.TAU
      - Terminate com.shashikant.TAU:31875
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Setting up automation session
      - Wait for com.shashikant.TAU to idle
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Given App is ready 
  - Checking existence of `"enrollButton" Button`
- When I enter city London 
  - Tap "city" TextField
    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Find the "city" TextField
    - Check for interrupting elements affecting "city" TextField
    - Synthesize event
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Type 'London' into "city" TextField
    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Find the "city" TextField
    - Check for interrupting elements affecting "city" TextField
    - Synthesize event
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- When I Enrolled 
  - Tap "enrollButton" Button
    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Find the "enrollButton" Button
    - Check for interrupting elements affecting "enrollButton" Button
    - Synthesize event
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Scroll element to visible
      - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11
    - Retrying `Tap "enrollButton" Button` (attempt <span>#</span>2)
      - Wait for com.shashikant.TAU to idle
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Find the "enrollButton" Button
      - Check for interrupting elements affecting "enrollButton" Button
      - Synthesize event
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

        - Scroll element to visible
        - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11
    - Retrying `Tap "enrollButton" Button` (attempt <span>#</span>3)
      - Wait for com.shashikant.TAU to idle
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Find the "enrollButton" Button
      - Check for interrupting elements affecting "enrollButton" Button
      - Synthesize event
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

        - Scroll element to visible
        - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11
    - Assertion Failure at BDDTest.swift:40: Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58911, elementOrHash.elementID: 5661339664.11)
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Tear Down
  - Terminate com.shashikant.TAU:58911
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

</table>

<a name="tauuitests_tauuitests"/><h5>TAUUITests&nbsp;[<img src="https://xcresulttool-static.netlify.app/i/back.png" alt="back" width="14px" align="top">](#user-content-tauuitests_tauuitests_summary)</h5>
<table>
<tr>
<th><img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/skipped.png" alt="Skipped" title="Skipped" width="14px" align="top"><th><img src="https://xcresulttool-static.netlify.app/i/expected-failure.png" alt="Expected Failure" title="Expected Failure" width="14px" align="top"><th>:stopwatch:
<tr>
<td align="right" width="154px">1 (50%)<td align="right" width="154px"><b>1 (50%)</b><td align="right" width="154px">0 (0%)<td align="right" width="154px">0 (0%)<td align="right" width="154px">8.15s
</table>

<table>
<tr><td align="center" valign="top" width="52px"><img src="https://xcresulttool-static.netlify.app/i/passed.png" alt="Success" title="Success" width="14px" align="top"><td valign="top" width="716px"><img src="https://xcresulttool-static.netlify.app/i/test-method.png" alt="test-method" width="14px" align="top">&nbsp;<code>testAllElementsOfMainScreen()</code><br><br><b>Activities:</b>

- Start Test at 2021-10-17 02:43:23.565
- Some screenshots were deleted because testing is configured to remove automatic screenshots on success.
- Set Up
  - Open com.shashikant.TAU
    - Launch com.shashikant.TAU
      - Setting up automation session
      - Wait for com.shashikant.TAU to idle
- Tap "welcomeMessage" StaticText
  - Wait for com.shashikant.TAU to idle
  - Find the "welcomeMessage" StaticText
  - Check for interrupting elements affecting "welcomeMessage" StaticText
  - Synthesize event
  - Wait for com.shashikant.TAU to idle
- Tap "enterCity" StaticText
  - Wait for com.shashikant.TAU to idle
  - Find the "enterCity" StaticText
  - Check for interrupting elements affecting "enterCity" StaticText
  - Synthesize event
  - Wait for com.shashikant.TAU to idle
- Tap "enrollButton" Button
  - Wait for com.shashikant.TAU to idle
  - Find the "enrollButton" Button
  - Check for interrupting elements affecting "enrollButton" Button
  - Synthesize event
  - Wait for com.shashikant.TAU to idle
- Tap "TAUlogo" Image
  - Wait for com.shashikant.TAU to idle
  - Find the "TAUlogo" Image
  - Check for interrupting elements affecting "TAUlogo" Image
  - Synthesize event
  - Wait for com.shashikant.TAU to idle
- Checking existence of `"Please Enter City" StaticText`
- Tear Down
  - Terminate com.shashikant.TAU:58931
<tr><td align="center" valign="top" width="52px"><img src="https://xcresulttool-static.netlify.app/i/failure.png" alt="Failure" title="Failure" width="14px" align="top"><td valign="top" width="716px"><a name="tauuitests_tauuitests/testthankyoumessage()"/><img src="https://xcresulttool-static.netlify.app/i/test-method.png" alt="test-method" width="14px" align="top">&nbsp;<code>testThankYouMessage()</code><a href="#user-content-tauuitests_tauuitests/testthankyoumessage()_failure-summary"><img src="https://xcresulttool-static.netlify.app/i/back.png" alt="back" width="14px" align="top"></a><br><br><b>Activities:</b>

- Start Test at 2021-10-17 02:43:29.414
  <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Set Up
  - Open com.shashikant.TAU
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Launch com.shashikant.TAU
      - Setting up automation session
      - Wait for com.shashikant.TAU to idle
        <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Tap "city" TextField
  - Wait for com.shashikant.TAU to idle
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Find the "city" TextField
  - Check for interrupting elements affecting "city" TextField
  - Synthesize event
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Wait for com.shashikant.TAU to idle
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Type 'London' into "city" TextField
  - Wait for com.shashikant.TAU to idle
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Find the "city" TextField
  - Check for interrupting elements affecting "city" TextField
  - Synthesize event
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Wait for com.shashikant.TAU to idle
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Tap "enrollButton" Button
  - Wait for com.shashikant.TAU to idle
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

  - Find the "enrollButton" Button
  - Check for interrupting elements affecting "enrollButton" Button
  - Synthesize event
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Scroll element to visible
    - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11
  - Retrying `Tap "enrollButton" Button` (attempt <span>#</span>2)
    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Find the "enrollButton" Button
    - Check for interrupting elements affecting "enrollButton" Button
    - Synthesize event
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Scroll element to visible
      - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11
  - Retrying `Tap "enrollButton" Button` (attempt <span>#</span>3)
    - Wait for com.shashikant.TAU to idle
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

    - Find the "enrollButton" Button
    - Check for interrupting elements affecting "enrollButton" Button
    - Synthesize event
      <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

      - Scroll element to visible
      - Failed: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11
  - Assertion Failure at TAUUITests.swift:24: Failed to synthesize event: Failed to scroll to visible (by AX action) Button, {{25.0, 500.0}, {330.0, 41.0}}, identifier: 'enrollButton', label: 'Enroll', error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11. (Underlying Error: Error kAXErrorCannotComplete performing AXAction kAXScrollToVisibleAction on element AX element pid: 58971, elementOrHash.elementID: 4931535136.11)
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

- Tear Down
  - Terminate com.shashikant.TAU:58971
    <details open><summary><img src="https://xcresulttool-static.netlify.app/i/attachment.png" alt="attachment" width="14px" align="top"></summary><div><img width="375px" src="undefined"></div></details>

</table>
