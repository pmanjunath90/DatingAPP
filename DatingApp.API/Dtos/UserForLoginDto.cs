using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(16, MinimumLength=8)]
        public string Password { get; set; }

    }
}