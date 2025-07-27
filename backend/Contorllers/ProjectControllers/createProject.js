const Project=require('../../Models/ProjectModels/Project') 
exports.createProjectapi=async(req,res)=>{
 try {

    const project=new Project(req.body);
    project.save();
    
    res.status(201).json({success:true,message:"project saved in database"});
 } catch (error) {
    console.log("err",error);
     res.status(500).json({ success: false, message: 'Server error' });
 }
}