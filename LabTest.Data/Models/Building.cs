using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace LabTest.Data.Models
{
    [Table("Building")]
    public class Building
    {
        [Key]
        public Int16 Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
    }
}
