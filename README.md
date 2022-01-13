# IG Mute

I'm annoyed that I can't mute everyone by default, or easily view the people I have muted.
So I'm building this.

## Configuration

Create a .env file, and add the following variables.

`IG_MUTE_ACCOUNT_PATH`
`IG_USERNAME`
`IG_PASSWORD`
`IG_PROXY`

## Notes

Sadly, the /api/v1/friendships/show_many API doesn't seem to give back the mute data, so the list API takes realllllllly long to run (as it also needs to pretend to be a human, and wait somewhere between 1 and 7 seconds per API call). I suggest running it and storing the data, and then making one full change. This isn't really an operation you run multiple times sadly. 

## How to use
```
# Store the current data (this call takes in the worst case 7 seconds per followee)
ig-mute list > mute_data

# Go through the list, and remove any of the users you don't want to mute, and those that aren't already muted.

# Pass in the users you want to mute.
ig-mute mute < mute_these_ones
```
