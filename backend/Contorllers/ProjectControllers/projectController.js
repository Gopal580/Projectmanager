const Project=require('../../Models/ProjectModels/Project')


exports.dashboardStatsapi=async(req,res)=>{
 try {
    const newProject=await Project.countDocuments({status:"New"}) ;
    const  sentToCEO=await Project.countDocuments({status:"Sent to CEO"});
    const invoiceRaised=await Project.countDocuments({status:"Invoice Raised"});
    const approvedByClient=await Project.countDocuments({status:"Approved by Client"});
    const totalProjects=await Project.countDocuments();
    const allProjects=await Project.find();

    res.json({
        stats:{
            newProject,
            sentToCEO,
            invoiceRaised,
            approvedByClient,
            totalProjects
        },
        allProjects
    })
 } catch (error) {
    console.log("dashboard err",error);
    res.status(500).json({
        success:false,
        message:"internal server errror"
    })
 }
}


// get All projects 


exports.getAllProjects = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = "",status="" } = req.query;

    const query = search
      ? { projectName: { $regex: search, $options: "i" } }
      : {};

        // If status filter provided
    if (status && status !== "All") {
      query.status = status;
    }
    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(pageSize)),
      Project.countDocuments(query),
    ]);

    res.status(200).json({ projects, total });
  } catch (err) {
    console.error("Get Projects Error:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


//get required project with projectId
exports.getSingleProject=async(req,res)=>{
  try {
     const projectId = req.params.id;
     const project=await Project.findById({_id:projectId})
   
     res.status(201).json({
      message:"project object found",
      success:true,
      project
     })
     
    
  } catch (error) {
    console.error("Get singleProject Error:", err);
    res.status(500).json({ message: "Failed to fetch  the single project" });
  }
}

// update the status
exports.updateStatus =async(req, res) => {
  
  const { projectIds, newStatus } = req.body;

  if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
    return res.status(400).json({ error: 'No project IDs provided' });
  }

  try {
    await Project.updateMany(
      { _id: { $in: projectIds } },
      { $set: { status: newStatus } }
    );
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project statuses' });
  }
};
