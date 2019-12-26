using System;
using System.Threading.Tasks;
using DatingApp.API.Model;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        public readonly DataContext _context ;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
          var user= await  _context.Users.FirstOrDefaultAsync(x=> x.UserName== username);

          if(user==null) return null;

          if( !VerifyPasswordHash(password,user.PasswordSalt,user.PasswordHash))
            return null;

          return user;            
        }

        private bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using(var hmac= new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if(passwordHash[i]!=computedHash[i])
                        return false;

                }                

            }

            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, psswordSalt;

            CreatePasswordHash(password,out passwordHash, out psswordSalt);

            user.PasswordHash=passwordHash;
            user.PasswordSalt=psswordSalt;

            await _context.Users.AddAsync(user);  
            await _context.SaveChangesAsync();

            return user;
            
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] psswordSalt)
        {
            using(var hmac= new System.Security.Cryptography.HMACSHA512())
            {
                psswordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }        
        }

       public async Task<bool> UserExist(string UserName)
        {
           if( await _context.Users.AnyAsync(x=> x.UserName==UserName))           
                return true;
           
            return false;            
        }
    }
}