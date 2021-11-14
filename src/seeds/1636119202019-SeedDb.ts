import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1636119202019 implements MigrationInterface {
  name = 'SeedDb1636119202019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    //password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$RyrelzfbfCKoh6jKDz8Ld.T8x4h7bP8/hK8fx2/pp1sAUjmewnvle')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (title, slug, description, body, "tagList", "authorId") VALUES ('First article', 'first-article', 'first article description', 'first article body','coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (title, slug, description, body, "tagList", "authorId") VALUES ('Second article', 'second-article', 'second article description', 'second article body','coffee,dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
