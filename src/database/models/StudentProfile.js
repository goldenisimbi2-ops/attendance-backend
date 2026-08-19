import { DataTypes } from 'sequelize';
export default s=>s.define('StudentProfile',
    {id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    userId:{type:DataTypes.UUID,allowNull:false,unique:true},
    studentNumber:{type:DataTypes.STRING,allowNull:false,unique:true},
    classId:{type:DataTypes.UUID,allowNull:false},
    dateOfBirth:DataTypes.DATEONLY
    ,gender:{type:DataTypes.ENUM('male','female','other','prefer_not_to_say')}});
