import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import LeaveEntitlement from "./Component/GenrealSetting/LeaveEntitle";
import MyAttendanceReport from './Component/Attendance/MyAttendanceReport';
import Attendance from './Component/Attendance/Attendance';
import AttendanceSummary from './Component/Attendance/AttendanceSummary';
import Onlinepunch from './Component/Attendance/Onlinepunch';
import ApprovalStatus from './Component/Attendance/ApprovalStatus';
import Longtermloan from './Component/Attendance/Longtermloan';
import AttendanceLayout from './Pages/AttendanceLayout';
import DashboardLayout from './Pages/DashboardLayout';
import LeaveEntry from './Component/Leave/LeaveEntry';
import LeaveLayout from './Pages/LeaveLayout';
import LeaveBalance from './Component/Leave/LeaveBalance';
import ApprovalLayout from './Pages/ApprovalLayout';
import HrApproval from './Component/Approval/HrApproval';
import HodApproval from './Component/Approval/HodApproval';
import CODApproval from './Component/Approval/CODApproval';
import HrReportLayout from './Pages/HrReportLayout';
import Hrattendancereport from './Component/Hrreport/HrAttendancereport';
import HrLeaveBalance from './Component/Hrreport/HrLeaveBalance';
import LeaveReport from './Component/Hrreport/LeaveReport';
import HrEntryStatus from './Component/Hrreport/HrEntryStatus'; 
import ArrearsReport from './Component/Hrreport/ArrearsReport';
import AttendanceDetailReport from './Component/Hrreport/AttendanceDetailReport';
import SettingLayout from './Pages/SettingLayout';
import EmployeeInfo from './Component/EmployeeMangement/EmployeeInfo';
import EmpployeeManagementLayout from './Pages/EmployeeMagementLayout';
import Location from './Component/GenrealSetting/Location';
import SecurityRole from './Component/GenrealSetting/SecurityRole';
import GazettedHoliday from './Component/GenrealSetting/GazettedHoliday';
import LeaveEntitle from './Component/GenrealSetting/LeaveEntitle';
import ApprovalPolicy from './Component/GenrealSetting/ApprovalPolicy';
import EmailConfiguration from './Component/GenrealSetting/EmailConfiguration';
import PayrollLayout from './Pages/PayrollLayout';
import PayrollMonths from './Component/Payroll/PayrollMonths';
import PayrollSetup from './Component/Payroll/PayrollSetup';
import AllowanceDeductionTypes from './Component/Payroll/AllowanceDeductionTypes';
import AllowanceDeduction from './Component/Payroll/AllowanceDeduction';
import PayrollFinalReport from './Component/Payroll/PayrollFinalReport';
import PayrollPublish from './Component/Payroll/PayrollPublish';
import PayrollPublishedReport from './Component/Payroll/PayrollPublishedReport';
import CreateShift from "./Component/Shiftsetup/CreateShift";
import ShiftLayout from "./Pages/ShiftLayout";
import AssignShiftEmployee from "./Component/Shiftsetup/AssignShiftEmployee";
import EmployeeMangementLayout from "./Pages/EmployeeMagementLayout";
import Department from "./Component/EmployeeMangement/Department";
import Designation from "./Component/EmployeeMangement/Designation";
import ManagementLayout from "./Pages/ManagementLayout";
import OrganisationStructure from "./Component/Management/OrganisationStructure";
import PerformanceLayout from "./Pages/PerformanceLayout";
import EmployeementInfo from "./Component/EmployeeMangement/EmployeementInfo"
import PerformanceEntry from "./Component/Performance/PerformanceEntry";
import PerformanceReport from "./Component/Performance/PerformanceReport";
import PerformanceTemplate from "./Component/Performance/PerformanceTemplate";
import EmployeeContact from "./Component/EmployeeMangement/EmployeeContact";
import EmployeeProfile from "./Component/EmployeeMangement/EmployeeProfile";
import ReportLayout from "./Pages/ReportLayout"
import Report from "./Component/Report/Report"

import 'react-toastify/dist/ReactToastify.css';
import PaysSip from "./Component/Attendance/PaysSip";
import Payroll from "./Component/EmployeeMangement/Payroll";
import Security from "./Component/EmployeeMangement/Security";
import File from "./Component/EmployeeMangement/File";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
    },
    // {
    //     path:'managmentDashboard',
    //     element:<ManagmentDashboard />
    // },
    //attendance
    {
      path: "/attendance",
      element: <AttendanceLayout />,
      children: [
        {
          path: "/attendance",
          element: <MyAttendanceReport />,
        },

        {
          path: "/attendance/report",
          element: <MyAttendanceReport />,
        },
        {
          path: "/attendance/summary",
          element: <AttendanceSummary />,
        },
        {
          path: "/attendance/approvalstatus",
          element: <ApprovalStatus />,
        },
        {
          path: "/attendance/onlinepunch",
          element: <Onlinepunch />,
        },
        {
          path: "/attendance/longtermloan",
          element: <Longtermloan />,
        },
        {
          path: "setting/leaveEnttitlement",
          element: <LeaveEntitlement />,
        },{
          path: "/attendance/pay-slip",
          element: <PaysSip/>
        }
      ],
    },
    //leave
    {
      path: "/leave",
      element: <LeaveLayout />,
      children: [
        {
          path: "/leave",
          element: <LeaveEntry />,
        }
        
      ],
    },
    //Aproval
    {
      path: "/approval",
      element: <ApprovalLayout />,
      children: [
        {
          path: "/approval",
          element: <HodApproval />,
        },
        {
          path: "/approval/hr_approval",
          element: <HrApproval />,
        }
      ],
    },

    //hrreport
    {
      path: "/hrreport",
      element: <HrReportLayout />,
      children: [
        {
          path: "/hrreport",
          element: <Hrattendancereport />,
        },
        {
          path: "/hrreport/attendance_deatil_report",
          element: <AttendanceDetailReport />,
        },
      ],
    },
    // setting
    {
      path: "/setting",
      element: <SettingLayout />,
      children: [
        {
          path: "/setting/location",
          element: <Location />,
        },
        {
          path: "/setting/security_role",
          element: <SecurityRole />,
        },
        {
          path: "/setting/leave_enttitlement",
          element: <LeaveEntitle />,
        },
        {
          path: "/setting",
          element: <GazettedHoliday />,
        },
        {
          path: "setting/approval_policy",
          element: <ApprovalPolicy />,
        },
        {
          path: "setting/email_configuration",
          element: <EmailConfiguration />,
        },
      ],
    },
    // payroll
    {
      path: "/payroll",
      element: <PayrollLayout />,
      children: [
        {
          path: "/payroll",
          element: <PayrollMonths />,
        },
        {
          path: "/payroll/payroll_setup",
          element: <PayrollSetup />,
        },
        {
          path: "/payroll/allowance_deduction_types",
          element: <AllowanceDeductionTypes />,
        },
        {
          path: "/payroll/allowance_deduction",
          element: <AllowanceDeduction />,
        },
        {
          path: "/payroll/payroll_final_report",
          element: <PayrollFinalReport />,
        },
        {
          path: "/payroll/payroll_publish",
          element: <PayrollPublish />,
        },
        {
          path: "/payroll/payroll_publish_report",
          element: <PayrollPublishedReport />,
        },
      ],
    },
    {
      path: "/shiftsetup",
      element: <ShiftLayout />,
      children: [
        {
          path: "/shiftsetup",
          element: <CreateShift />,
        },
        {
          path:"/shiftsetup/assign_shift_employee",
          element:<AssignShiftEmployee/>
        }
      ],
    },
    {
      path:"/employeemanagement",
      element:<EmpployeeManagementLayout/>,
      children:[
        
        {
          path: "/employeemanagement",
        element: <EmployeeInfo />
        },
        {
          path: "/employeemanagement/employee_contact", // ❌ Remove the leading "/"
          element: <EmployeeContact />
        },
        {
          path: "/employeemanagement/employee_profile/:id", // ❌ Remove the leading "/"
          element: <EmployeeProfile />
        },
        {
          path: "/employeemanagement/employee_profile", // ❌ Remove the leading "/"
          element: <EmployeeProfile />
        },
        
        {
          
          path: "/employeemanagement/employeement_info", // ❌ Remove the leading "/"
          element: <EmployeementInfo />
        },{
          
          path: "/employeemanagement/payroll", // ❌ Remove the leading "/"
          element: <Payroll />
        },
        {
          
          path: "/employeemanagement/security", // ❌ Remove the leading "/"
          element: <Security />
        },
        {
          
          path: "/employeemanagement/file", // ❌ Remove the leading "/"
          element: <File />
        },
        {
          path: "/employeemanagement/department",
        element: <Department/>
        },
        {
          path: "/employeemanagement/designation",
        element: <Designation/>
        }
      ]
    },
    {
      path:"/management",
      element:<ManagementLayout/>,
      children:[
        {
          path: "/management",
          element: <OrganisationStructure/>
        }
      ]},
    {
        path:"/performance",
        element:<PerformanceLayout/>,
        children:[
          {
            path: "/performance",
            element: <PerformanceTemplate/>
          },
          {
            path: "/performance/performance_entry",
            element: <PerformanceEntry/>
          },
          {
            path: "/performance/performance_report",
            element: <PerformanceReport/>
          }
    ]},
    {
      path: "/report",
      element: <ReportLayout />,
      children: [
        {
          path: "/report", 
          element: <Report />
        }]}
  ]);

  return <RouterProvider router={router} />;
}

export default App;
