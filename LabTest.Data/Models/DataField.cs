using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace LabTest.Data.Models
{
    [Table("DataField")]
    public class DataField
    {
        [Key]
        public Byte Id { get; set; }
        public string Name { get; set; }
        
    }
}
