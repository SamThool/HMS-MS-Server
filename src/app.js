import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import authRoutes from "./modules/Auth/routes.js";
import roleRoutes from "./modules/master/role/routes.js";
import prefixRoutes from "./modules/master/prefix/routes.js";
import diplomaRoutes from "./modules/master/diploma/routes.js";
import graduationRoutes from "./modules/master/graduation/routes.js";
import diagnosisRoutes from "./modules/medical-master/diagnosis/routes.js";
import postGraduationRoutes from "./modules/master/PostGraduation/routes.js";
import SuperSpecializationRoutes from "./modules/master/SuperSpecialization/routes.js";
import councilRoutes from "./modules/master/Councils/routes.js";
import departmentTypeRoutes from "./modules/master/department-type/routes.js";
import departmentSubTypeRoutes from "./modules/master/department-sub-type/routes.js";
import departmentRoutes from "./modules/master/department/routes.js";
import designationRoutes from "./modules/master/designation/routes.js";
import userRoutes from "./modules/User/routes.js";
import ledgerRoutes from "./modules/master/ledger/routes.js";
import subLedgerRoutes from "./modules/master/sub-ledger/routes.js";
import paymentModeRoutes from "./modules/master/payment-mode/routes.js";
import payeeCategoryRoutes from "./modules/master/payee-category/routes.js";
// import serviceGroupRoutes from "./modules/master/service-group/routes.js";
import billGroupRoutes from "./modules/master/bill-group/routes.js";
import serviceListRoutes from "./modules/master/service-list/routes.js";
import tpaRoutes from "./modules/master/tpa/routes.js";
import gipsaaCompanyRoutes from "./modules/master/gipsaa/routes.js";
import insuranceCompanyRoutes from "./modules/master/insurance/routes.js";
import governmentCompanyRoutes from "./modules/master/goverment-company/routes.js";
import corporateCompanyPublicRoutes from "./modules/master/corporate-company-public/routes.js";
import corporateCompanyPrivateRoutes from "./modules/master/corporate-company-private/routes.js";
import doctorScheduleRoutes from "./modules/User/doctor-schedule/routes.js";
import uhidRoutes from "./modules/UHID/routes.js";
import OPDRoutes from "./modules/opd/registration/routes.js";
import appointmentRoutes from "./modules/opd/appointment/routes.js";
import serviceRateRoutes from "./modules/master/service-rate/routes.js";
import payeeRateConfigurationRoutes from "./modules/master/payee-rate-configuration/routes.js";
import hospitalSetupRoutes from "./modules/hospital-setup/routes.js";
import chiefComplaintMaster from "./modules/medical-master/chief-complaint-master/routes.js";

import pastHistoryRoutes from "./modules/medical-master/history-master/past-history/routes.js";
import familyHistoryRoutes from "./modules/medical-master/history-master/family-history/routes.js";
import allergyHistoryRoutes from "./modules/medical-master/history-master/allergies-history/routes.js";
import procedureHistoryRoutes from "./modules/medical-master/history-master/procedure-history/routes.js";
import drugHistoryRoutes from "./modules/medical-master/history-master/drug-history/routes.js";

import medicineRoutes from "./modules/medical-master/medicine/routes.js";

import genericNameRoutes from "./modules/medical-master/medicine/generic-name/routes.js";
import typeMedRoutes from "./modules/medical-master/medicine/med-type/routes.js";
import routeMedRoutes from "./modules/medical-master/medicine/med-route/routes.js";
import medCategoryRoutes from "./modules/medical-master/medicine/med-category/routes.js";
import medDoseRoutes from "./modules/medical-master/medicine/med-dose/routes.js";
import brandNameRoutes from "./modules/medical-master/medicine/brand-name/routes.js";
import ExaminationMaster from "./modules/medical-master/examination-master/routes.js";

import radiologyRoutes from "./modules/medical-master/radiology/routes.js";
import pathologyRoutes from "./modules/medical-master/pathology/routes.js";
import otherDiagnosisRoutes from "./modules/medical-master/otherDiagnosis/routes.js";

import instructionRoutes from "./modules/medical-master/instruction/routes.js";
import procedureRoutes from "./modules/medical-master/procedure/routes.js";

import opdemrRoutes from "./modules/opd/opd-emr/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// routes will go here later
app.get("/", (req, res) => res.send("HMS MadeSimplified API running"));

app.use("/past-history", pastHistoryRoutes);
app.use("/family-history", familyHistoryRoutes);
app.use("/allergy-history", allergyHistoryRoutes);
app.use("/procedure-history", procedureHistoryRoutes);
app.use("/drug-history", drugHistoryRoutes);

app.use("/hospital-setup", hospitalSetupRoutes);
app.use("/auth", authRoutes);
app.use("/doctor-schedule", doctorScheduleRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/uhid", uhidRoutes);
app.use("/users", userRoutes);
app.use("/role", roleRoutes);
app.use("/ledger", ledgerRoutes);
app.use("/sub-ledger", subLedgerRoutes);
app.use("/payment-mode", paymentModeRoutes);
app.use("/payee-category", payeeCategoryRoutes);
app.use("/bill-group", billGroupRoutes);
app.use("/service-list", serviceListRoutes);
// app.use("/service-group", serviceGroupRoutes);
app.use("/procedure", procedureRoutes);
app.use("/opd-emr", opdemrRoutes);
app.use("/tpa", tpaRoutes);
app.use("/chief-complaint-master", chiefComplaintMaster);
app.use("/gipsaa-company", gipsaaCompanyRoutes);
app.use("/insurance-company", insuranceCompanyRoutes);
app.use("/opd", OPDRoutes);
app.use("/government-company", governmentCompanyRoutes);
app.use("/corporate-company-public", corporateCompanyPublicRoutes);
app.use("/corporate-company-private", corporateCompanyPrivateRoutes);
app.use("/prefix", prefixRoutes);
app.use("/diploma", diplomaRoutes);
app.use("/instruction", instructionRoutes);
app.use("/graduation", graduationRoutes);
app.use("/diagnosis", diagnosisRoutes);
app.use("/post-graduation", postGraduationRoutes);
app.use("/speciality", SuperSpecializationRoutes);
app.use("/council", councilRoutes);
app.use("/department-type", departmentTypeRoutes);
app.use("/department-sub-type", departmentSubTypeRoutes);
app.use("/department", departmentRoutes);
app.use("/designation", designationRoutes);
app.use("/service-rate", serviceRateRoutes);
app.use("/payee-rate-configuration", payeeRateConfigurationRoutes);

app.use("/medicine", medicineRoutes);

app.use("/generic-name", genericNameRoutes);
app.use("/type-med", typeMedRoutes);
app.use("/route-med", routeMedRoutes);
app.use("/med-category", medCategoryRoutes);
app.use("/med-dose", medDoseRoutes);
app.use("/brand-name", brandNameRoutes);

app.use("/examination-master", ExaminationMaster);

app.use("/radiology", radiologyRoutes);
app.use("/pathology", pathologyRoutes);
app.use("/other-diagnosis", otherDiagnosisRoutes);

export default app;
