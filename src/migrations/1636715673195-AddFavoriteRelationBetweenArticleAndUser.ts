import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoriteRelationBetweenArticleAndUser1636715673195
  implements MigrationInterface
{
  name = 'AddFavoriteRelationBetweenArticleAndUser1636715673195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_favorite_articles" ("usersId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_3eb5b91cadd514d818ad29b30ed" PRIMARY KEY ("usersId", "articlesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_46252de0d4102268ebdecade9d" ON "users_favorite_articles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c27fe49c38031383c81b7cdbae" ON "users_favorite_articles" ("articlesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" ADD CONSTRAINT "FK_46252de0d4102268ebdecade9df" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" ADD CONSTRAINT "FK_c27fe49c38031383c81b7cdbae1" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" DROP CONSTRAINT "FK_c27fe49c38031383c81b7cdbae1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" DROP CONSTRAINT "FK_46252de0d4102268ebdecade9df"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c27fe49c38031383c81b7cdbae"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_46252de0d4102268ebdecade9d"`,
    );
    await queryRunner.query(`DROP TABLE "users_favorite_articles"`);
  }
}
