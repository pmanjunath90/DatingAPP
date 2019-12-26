using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }


        [Required]
        [StringLength(16, MinimumLength=8)]
        public string Password {get; set;}

    }
}