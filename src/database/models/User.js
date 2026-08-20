import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
export default (sequelize) => sequelize.define('User',
     { id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
      firstName:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}}, 
      lastName:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true}}, 
      email:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{isEmail:true}}, 
      password:{type:DataTypes.STRING,allowNull:false}, 
      role:{type:DataTypes.ENUM('admin','head_teacher','teacher','student'),
        allowNull:false,defaultValue:'student'}, phone:DataTypes.STRING,
         isActive:{type:DataTypes.BOOLEAN,defaultValue:true} }, 
         { hooks:{ beforeCreate: async u=>{u.password=await bcrypt.hash(u.password,12)}, beforeUpdate:async u=>{if(u.changed('password'))u.password=await bcrypt.hash(u.password,12)} },
          defaultScope:{attributes:{exclude:['password']}},
           scopes:{withPassword:{}} });
