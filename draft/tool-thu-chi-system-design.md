## API design
1. Authen
   1. Login
      1. Username, pwd
      2. JWT, expire time = 30d
   2. Logout
      1. Delete JWT key.
2. Dashboard (statistic)
   1. Get statistic
      1. Type: all | byDate
      2. 
3. People
   1. Get list people
      1. Filter people
         1. Name
         2. Status
         3. Join date
   2. Add people
   3. Update people
      1. Write to update log table
   4. Delete people
4. Expend
   1. Get list expend (order by id desc default)
   2. Create expend
   3. Update expend
   4. Delete expend (Remember to add balance if delete an expend)

## Database design

