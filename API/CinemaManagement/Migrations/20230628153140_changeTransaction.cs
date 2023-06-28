using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaManagement.Migrations
{
    public partial class changeTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "TransactionFood");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "HistoryTransaction");

            migrationBuilder.RenameColumn(
                name: "PersonId",
                table: "TransactionFood",
                newName: "TransactionId");

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "TransactionFood",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<long>(
                name: "TransactionId",
                table: "MstTicket",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "CusId",
                table: "HistoryTransaction",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EmpId",
                table: "HistoryTransaction",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "quantity",
                table: "TransactionFood");

            migrationBuilder.DropColumn(
                name: "CusId",
                table: "HistoryTransaction");

            migrationBuilder.DropColumn(
                name: "EmpId",
                table: "HistoryTransaction");

            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "TransactionFood",
                newName: "PersonId");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "TransactionFood",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<long>(
                name: "TransactionId",
                table: "MstTicket",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PersonId",
                table: "HistoryTransaction",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
