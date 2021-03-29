using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LabTest.Data.ViewModels
{
    [Table("View_UserRole")]
    public class View_UserRole
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? RoleId { get; set; }
        public string Designation { get; set; }
        public string FullName { get; set; }
        public string IsActive { get; set; }
        public int? DeskId { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
    }
}
