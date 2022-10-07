@Echo off
SET Month=%DATE:~3,2%
if %Month%==01 set Month=ENE
if %Month%==02 set Month=FEB
if %Month%==03 set Month=MAR
if %Month%==04 set Month=ABR
if %Month%==05 set Month=MAY
if %Month%==06 set Month=JUN
if %Month%==07 set Month=JUL
if %Month%==08 set Month=AGO
if %Month%==09 set Month=SEP
if %Month%==10 set Month=OCT
if %Month%==11 set Month=NOV
if %Month%==12 set Month=DIC

7z a -aoa -r -x!*.zip -x!*.exe -x!*.bat -x!*.dll -x!*.db -x!*.thmb -x!*.thumbnail -x!*.fla -x!*._Icon* -x!*.bat -x!*.as -x!*.ljr -x!*.bak -x!*.old -x!*.DS_Store _SCORM_%DATE:~0,2%%Month%%DATE:~-2,2%.zip