import { DataTypes } from 'sequelize';
export default s=>s.define('AttendanceSession',
    {id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    classSubjectId:{type:DataTypes.UUID,allowNull:false},
    date:{type:DataTypes.DATEONLY,allowNull:false},
    startTime:{type:DataTypes.TIME,allowNull:false},
    endTime:{type:DataTypes.TIME,allowNull:false},
    title:{type:DataTypes.STRING,allowNull:false},
    description:DataTypes.TEXT,
    status:{type:DataTypes.ENUM('open','closed','cancelled'),defaultValue:'open'},
    createdBy:{type:DataTypes.UUID,allowNull:false}},
    {validate:{timeOrder(){if(this.startTime>=this.endTime)throw new Error('endTime must be after startTime')}}});
