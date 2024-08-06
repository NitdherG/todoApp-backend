import { User, UserRepository } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";
import { admin, db } from "./FirestoreConfig";

/**
 * FirestoreUserRepository is an implementation of UserRepository that uses Firestore as the data store.
 */
export class FirestoreUserRepository implements UserRepository {

  /**
   * Adds a user to the users collection.
   * @param user - The user to be added.
   * @throws {CustomError} - If the user cannot be added.
   */
  async addUser(user: User): Promise<void> {
    try {
      await db.collection("users").add({
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      throw CustomError.badRequest("No se pudo agregar el usuario");
    }
  }

  /**
   * Retrieves a user by their email.
   * @param email - The email of the user to be retrieved.
   * @returns The user if found, or null if not found.
   * @throws {CustomError} - If the user cannot be found.
   */
  async getUser(email: string): Promise<User | null> {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .get();
      if (querySnapshot.empty) {
        throw CustomError.notFound("No se encontró el usuario");
      }
      const doc = querySnapshot.docs[0];

      return new User(
        doc.id,
        doc.data().email,
        doc.data().createdAt,
      );
    } catch (error) {
      throw CustomError.notFound("No se encontró el usuario");
    }
  }
}
