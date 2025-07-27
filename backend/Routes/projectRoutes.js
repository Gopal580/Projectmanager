const express=require('express');
const router=express.Router();

const  {createProjectapi}=require('../Contorllers/ProjectControllers/createProject.js')
const {dashboardStatsapi,getAllProjects,getSingleProject,updateStatus}=require('../Contorllers/ProjectControllers/projectController.js')
const verifyToken=require('../middlewares/authMiddleware')
router.use(verifyToken);

router.post('/create',createProjectapi);
router.get('/dashboard-stats',dashboardStatsapi)
router.get("/getAllProjects",getAllProjects);
router.get("/:id",getSingleProject);
router.put("/bulk-update-status",updateStatus);
module.exports=router;