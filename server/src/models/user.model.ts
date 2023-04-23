import { executeQueryAsync } from "../database/db";
import userQueries from "../queries/user.queries";
import queries from "../queries/user.queries";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface Credentials {
  email: string;
  password: string;
}

class UserModel {

  static async updateUserEmailVerified(userId: number, emailVerified: boolean) {
    try {
      const result = await executeQueryAsync(userQueries.UPDATE_EMAIL_VERIFIED, [emailVerified, userId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addUser(user: User) {
    try {
      const result = await executeQueryAsync(userQueries.ADD_NEW_USER, [
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.phone_number,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async checkIfEmailExists(email: string) {
    try {
      const result = await executeQueryAsync(queries.CHECK_IF_EMAIL_EXIST, [email]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async login(credentials: Credentials) {
    try {
      const user = await executeQueryAsync(userQueries.LOGIN, [credentials.email]);

      if (!user || user.length < 1) return null;
      const hashedPassword = user[0].password;
      const isPasswordMatch = await bcrypt.compare(credentials.password, hashedPassword);
      if (!isPasswordMatch) return null;
      delete user[0].password;
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUserPassword(user_id: number, newPassword: string) {
    try {
      const result = await executeQueryAsync(userQueries.UPDATE_USER_PASSWORD, [newPassword, user_id]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserModel;
