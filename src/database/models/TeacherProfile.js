import { DataTypes } from 'sequelize';
export default s=>s.define('TeacherProfile',{id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},userId:{type:DataTypes.UUID,allowNull:false,unique:true},employeeNumber:{type:DataTypes.STRING,allowNull:false,unique:true}});
