import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)


export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const LowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [LowerCaseGenre]
      )

      if (genres.length == 0) return []

      const [{ id }] = genres

      return []
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )
    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length == 0) return null

    return movies[0]
  }

  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
              VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete({ id }) {
    try {
      await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',
        [id]
      );
      return true; // Indicar éxito en la eliminación
    } catch (error) {
      console.error('Error deleting movie:', error);
      return false; // Indicar fallo en la eliminación
    }
  }

  static async update({ id, input }) {
    const { title, year, director, duration, poster, rate } = input;
    try {
      await connection.query(
        'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
        [title, year, director, duration, poster, rate, id]
      );
      return true; // Indicar éxito en la actualización
    } catch (error) {
      console.error('Error updating movie:', error);
      return false; // Indicar fallo en la actualización
    }
  }
}