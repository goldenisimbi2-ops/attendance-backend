import { DataTypes } from 'sequelize';
export default s=>s.define('AttendanceRecord',
    {id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    attendanceSessionId:{type:DataTypes.UUID,allowNull:false},
    studentId:{type:DataTypes.UUID,allowNull:false},
    status:{type:DataTypes.ENUM('present','absent','late','excused'),allowNull:false},
    checkInTime:DataTypes.DATE,remarks:DataTypes.TEXT,markedBy:{type:DataTypes.UUID,allowNull:false}},
    {indexes:[{unique:true,fields:['attendanceSessionId','studentId']}]});
