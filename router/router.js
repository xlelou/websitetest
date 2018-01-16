const Router=require("koa-router");
const managerRouter=require("./manager-router.js");
const actionRouter=require("./action-router.js");
const viewRouter=require("./view-router.js");
const APIRouter = require('./artical-router.js');

const router=new Router();
router.use(managerRouter.routes(),managerRouter.allowedMethods());
router.use(actionRouter.routes(),actionRouter.allowedMethods());
router.use(viewRouter.routes(),viewRouter.allowedMethods());
router.use(APIRouter.routes(),APIRouter.allowedMethods());


module.exports=router;
