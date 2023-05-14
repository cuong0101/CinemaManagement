using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaManagement.Migrations
{
    public partial class fixTableShowTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndRime",
                table: "MstShowTimes");

            migrationBuilder.DropColumn(
                name: "Release",
                table: "MstShowTimes");

            migrationBuilder.RenameColumn(
                name: "IdRoom",
                table: "MstShowTimes",
                newName: "RoomId");

            migrationBuilder.RenameColumn(
                name: "IdMoive",
                table: "MstShowTimes",
                newName: "MovieId");

            migrationBuilder.RenameColumn(
                name: "column",
                table: "MstSeats",
                newName: "Column");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "MstShowTimes",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RoomId",
                table: "MstShowTimes",
                newName: "IdRoom");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "MstShowTimes",
                newName: "IdMoive");

            migrationBuilder.RenameColumn(
                name: "Column",
                table: "MstSeats",
                newName: "column");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "StartTime",
                table: "MstShowTimes",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndRime",
                table: "MstShowTimes",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<DateTime>(
                name: "Release",
                table: "MstShowTimes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
