import { DataTypes } from 'sequelize';
export default s=>s.define('Subject',
    {id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    classId:{type:DataTypes.UUID,allowNull:true},
    name:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}}, 
    code:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{notEmpty:true}},
    description:DataTypes.TEXT});
