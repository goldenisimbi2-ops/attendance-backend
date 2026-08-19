import { DataTypes } from 'sequelize';
export default s=>s.define('ClassSubject',
    {id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    classId:{type:DataTypes.UUID,allowNull:false},
    subjectId:{type:DataTypes.UUID,allowNull:false},
    teacherId:{type:DataTypes.UUID,allowNull:false}},
    {indexes:[{unique:true,fields:['classId','subjectId']}]});
